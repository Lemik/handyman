const AWS = require('aws-sdk');

// Configure AWS SES
const ses = new AWS.SES({ region: 'us-east-1' }); // Change to your preferred region

exports.handler = async (event) => {
    // Enable CORS for all origins
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Credentials': 'false',
        'Content-Type': 'application/json'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'CORS preflight' })
        };
    }

    try {
        // Parse the request body
        const body = JSON.parse(event.body);
        
        // Extract form data
        const { name, contact, service, message } = body;
        
        // Validate required fields
        if (!contact) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Contact information (phone or email) is required' 
                })
            };
        }

        // Prepare email content
        const emailSubject = `New Estimate Request - ${service || 'General Service'}`;
        const emailBody = `
New estimate request received from your website:

Name: ${name || 'Not provided'}
Contact: ${contact}
Service: ${service || 'Not specified'}
Message: ${message || 'No additional details provided'}

Timestamp: ${new Date().toISOString()}

Please respond to this request as soon as possible.
        `.trim();

        // Email parameters
        const emailParams = {
            Source: 'handyman@dushyn.com', // Replace with your verified email
            Destination: {
                ToAddresses: ['leonid.dushin@gmail.com'] // Replace with your business email
            },
            Message: {
                Subject: {
                    Data: emailSubject,
                    Charset: 'UTF-8'
                },
                Body: {
                    Text: {
                        Data: emailBody,
                        Charset: 'UTF-8'
                    }
                }
            }
        };

        // Send email
        await ses.sendEmail(emailParams).promise();

        // Return success response
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                message: 'Estimate request submitted successfully! We will contact you soon.' 
            })
        };

    } catch (error) {
        console.error('Error processing estimate request:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to submit estimate request. Please try again or contact us directly.' 
            })
        };
    }
};
