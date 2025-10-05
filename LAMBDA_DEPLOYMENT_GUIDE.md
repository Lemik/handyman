# Lambda Function Deployment Guide for Estimate Form

This guide will help you deploy the Lambda function to handle estimate form submissions and send emails via AWS SES.

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Node.js** installed (for local testing)
4. **Domain email verification** in AWS SES

## Step 1: Set Up AWS SES

### 1.1 Verify Email Addresses
1. Go to AWS SES Console
2. Navigate to "Verified identities"
3. Add and verify your business email address (e.g., `your-business@yourdomain.com`)
4. Add and verify a "from" email address (e.g., `noreply@yourdomain.com`)

### 1.2 Request Production Access (if needed)
- If you're not in the SES sandbox, you can send to any email
- If you're in sandbox mode, you can only send to verified email addresses

## Step 2: Deploy Lambda Function

### 2.1 Create Lambda Function
```bash
# Create deployment package
cd /Users/leoniddushin/handyman
npm install

# Create zip file for Lambda
zip -r lambda-estimate-handler.zip lambda-estimate-handler.js node_modules/
```

### 2.2 Deploy via AWS Console
1. Go to AWS Lambda Console
2. Click "Create function"
3. Choose "Author from scratch"
4. Function name: `handyman-estimate-handler`
5. Runtime: `Node.js 18.x`
6. Click "Create function"

### 2.3 Upload Code
1. In the Lambda function, go to "Code" tab
2. Click "Upload from" → ".zip file"
3. Upload `lambda-estimate-handler.zip`

### 2.4 Configure Environment Variables
In the Lambda function configuration, add these environment variables:
- `AWS_REGION`: `us-east-1` (or your preferred region)
- `FROM_EMAIL`: `noreply@yourdomain.com`
- `TO_EMAIL`: `your-business@yourdomain.com`

## Step 3: Update Lambda Function Code

Replace the hardcoded email addresses in `lambda-estimate-handler.js`:

```javascript
// Update these lines in the Lambda function:
Source: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
Destination: {
    ToAddresses: [process.env.TO_EMAIL || 'your-business@yourdomain.com']
},
```

## Step 4: Set Up API Gateway

### 4.1 Create API Gateway
1. Go to API Gateway Console
2. Click "Create API"
3. Choose "REST API" → "Build"
4. API name: `handyman-estimate-api`
5. Click "Create API"

### 4.2 Create Resource and Method
1. Click "Actions" → "Create Resource"
2. Resource name: `estimate`
3. Resource path: `estimate`
4. Click "Create Resource"
5. Select the `/estimate` resource
6. Click "Actions" → "Create Method" → "POST"
7. Integration type: "Lambda Function"
8. Lambda Function: `handyman-estimate-handler`
9. Click "Save"

### 4.3 Enable CORS
1. Select the POST method
2. Click "Actions" → "Enable CORS"
3. Click "Enable CORS and replace existing CORS headers"
4. Click "Yes, replace existing values"

### 4.4 Deploy API
1. Click "Actions" → "Deploy API"
2. Deployment stage: `prod` (or create new stage)
3. Click "Deploy"

### 4.5 Get API URL
After deployment, you'll get an API URL like:
`https://abc123def4.execute-api.us-east-1.amazonaws.com/prod/estimate`

## Step 5: Update Website Configuration

### 5.1 Update Lambda URL in index.html
Replace the placeholder URL in `index.html`:

```javascript
// Find this line and replace with your actual API Gateway URL:
const LAMBDA_URL = 'https://your-actual-api-gateway-url.amazonaws.com/prod/estimate';
```

### 5.2 Test the Form
1. Open your website
2. Fill out the estimate form
3. Submit and verify you receive the email

## Step 6: Set Up Lambda Permissions

### 6.1 Add SES Permissions
The Lambda function needs permission to send emails via SES. Add this policy to your Lambda execution role:

```json
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
```

## Step 7: Optional Enhancements

### 7.1 Add Rate Limiting
Consider adding rate limiting to prevent spam:
- Use AWS API Gateway throttling
- Add request validation
- Implement IP-based rate limiting

### 7.2 Add Logging
Enable CloudWatch logging for the Lambda function to monitor submissions.

### 7.3 Add Email Templates
Enhance the email with HTML templates for better formatting.

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure CORS is enabled in API Gateway
2. **SES Sandbox**: Verify you're not in SES sandbox mode if sending to unverified emails
3. **Lambda Timeout**: Increase timeout if emails take long to send
4. **Permissions**: Ensure Lambda has SES permissions

### Testing:
```bash
# Test Lambda function locally
curl -X POST https://your-api-gateway-url.amazonaws.com/prod/estimate \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "contact": "test@example.com",
    "service": "roofing",
    "message": "Test message"
  }'
```

## Security Considerations

1. **Input Validation**: The Lambda function validates required fields
2. **Rate Limiting**: Consider implementing rate limiting
3. **Email Verification**: Only send emails to verified addresses
4. **HTTPS**: Always use HTTPS for form submissions

## Cost Estimation

- **Lambda**: ~$0.20 per 1M requests
- **SES**: $0.10 per 1,000 emails
- **API Gateway**: $3.50 per 1M API calls

For a small business, costs should be minimal (under $5/month for typical usage).

## Support

If you encounter issues:
1. Check CloudWatch logs for Lambda function errors
2. Verify SES email addresses are verified
3. Test API Gateway endpoints directly
4. Check browser console for JavaScript errors

