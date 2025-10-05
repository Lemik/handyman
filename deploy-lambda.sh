#!/bin/bash

# Lambda Function Deployment Script for Handyman Estimate Form
# Make sure AWS CLI is configured with appropriate permissions

set -e

echo "🚀 Starting Lambda function deployment..."

# Configuration
FUNCTION_NAME="handyman-estimate-handler"
REGION="us-east-1"
ROLE_NAME="handyman-lambda-role"
POLICY_NAME="handyman-lambda-policy"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if AWS CLI is installed and configured
if ! command -v aws &> /dev/null; then
    print_error "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    print_error "AWS credentials not configured. Run 'aws configure' first."
    exit 1
fi

print_status "AWS CLI is configured"

# Install dependencies
echo "📦 Installing dependencies..."
npm install
print_status "Dependencies installed"

# Create deployment package
echo "📦 Creating deployment package..."
zip -r lambda-estimate-handler.zip lambda-estimate-handler.js node_modules/ package.json
print_status "Deployment package created"

# Create IAM role for Lambda (if it doesn't exist)
echo "🔐 Setting up IAM role..."
ROLE_ARN=$(aws iam get-role --role-name $ROLE_NAME --query 'Role.Arn' --output text 2>/dev/null || echo "")

if [ -z "$ROLE_ARN" ]; then
    print_warning "IAM role doesn't exist. Creating..."
    
    # Create trust policy
    cat > trust-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
EOF

    # Create the role
    aws iam create-role \
        --role-name $ROLE_NAME \
        --assume-role-policy-document file://trust-policy.json \
        --description "Role for handyman Lambda function"
    
    # Attach basic execution policy
    aws iam attach-role-policy \
        --role-name $ROLE_NAME \
        --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    
    # Create and attach SES policy
    cat > ses-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": "*"
        }
    ]
}
EOF

    aws iam create-policy \
        --policy-name $POLICY_NAME \
        --policy-document file://ses-policy.json
    
    aws iam attach-role-policy \
        --role-name $ROLE_NAME \
        --policy-arn arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):policy/$POLICY_NAME
    
    # Wait for role to be ready
    echo "⏳ Waiting for IAM role to be ready..."
    sleep 10
    
    ROLE_ARN=$(aws iam get-role --role-name $ROLE_NAME --query 'Role.Arn' --output text)
    print_status "IAM role created: $ROLE_ARN"
else
    print_status "IAM role already exists: $ROLE_ARN"
fi

# Create or update Lambda function
echo "🔧 Creating/updating Lambda function..."
if aws lambda get-function --function-name $FUNCTION_NAME --region $REGION &> /dev/null; then
    print_warning "Lambda function exists. Updating..."
    aws lambda update-function-code \
        --function-name $FUNCTION_NAME \
        --zip-file fileb://lambda-estimate-handler.zip \
        --region $REGION
    print_status "Lambda function updated"
else
    print_warning "Lambda function doesn't exist. Creating..."
    aws lambda create-function \
        --function-name $FUNCTION_NAME \
        --runtime nodejs18.x \
        --role $ROLE_ARN \
        --handler lambda-estimate-handler.handler \
        --zip-file fileb://lambda-estimate-handler.zip \
        --timeout 30 \
        --memory-size 256 \
        --region $REGION
    print_status "Lambda function created"
fi

# Clean up temporary files
rm -f lambda-estimate-handler.zip trust-policy.json ses-policy.json

echo ""
print_status "Lambda function deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Set up API Gateway (see LAMBDA_DEPLOYMENT_GUIDE.md)"
echo "2. Update the LAMBDA_URL in index.html with your API Gateway URL"
echo "3. Verify your email addresses in AWS SES"
echo "4. Test the form submission"
echo ""
echo "📖 For detailed instructions, see: LAMBDA_DEPLOYMENT_GUIDE.md"

