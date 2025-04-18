import { json } from '@remix-run/node';
import type { ActionFunctionArgs } from '@remix-run/node';

// Define response type for TypeScript
export type QuoteResponse = {
  success?: boolean;
  messageId?: string;
  error?: string;
};
import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);
const clientEmail = process.env.CLIENT_EMAIL || 'customerservice@shipyourcarsafely.com';

// Default export for Remix
export default function QuoteApi() {
  return null;
}

// Handle GET requests
export function loader() {
  return json({ message: 'This endpoint only accepts POST requests' }, { status: 405 });
}

// Handle POST requests
export async function action({ request }: ActionFunctionArgs) {
  // Only accept POST requests
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    // Parse the request body
    const formData = await request.formData();
    const jsonData = formData.get('json');
    
    if (!jsonData || typeof jsonData !== 'string') {
      return json({ error: 'Invalid form data' }, { status: 400 });
    }
    
    const parsedData = JSON.parse(jsonData);
    
    // Validate required fields
    if (!parsedData.from || !parsedData.to || !parsedData.email || !parsedData.name) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Format vehicle details
    const vehicleDetails = parsedData.make && parsedData.model 
      ? `${parsedData.year} ${parsedData.make} ${parsedData.model} (${parsedData.operable === 'yes' ? 'Operable' : 'Non-operable'})`
      : 'Not provided';

    // Create email content in a simpler format that matches previous working emails
    const emailContent = `
      <h1>New Quote Request from ${parsedData.name}</h1>
      
      <h2>Customer Information:</h2>
      <p>Name: ${parsedData.name}</p>
      <p>Email: ${parsedData.email}</p>
      <p>Phone: ${parsedData.phone || 'Not provided'}</p>
      
      <h2>Shipping Details:</h2>
      <p>From: ${parsedData.from}</p>
      <p>To: ${parsedData.to}</p>
      <p>Pickup Date: ${parsedData.date || 'Not specified'}</p>
      
      <h2>Vehicle Information:</h2>
      <p>Vehicle: ${vehicleDetails}</p>
    `;

    // Log environment variables (without exposing full API key)
    console.log('Environment check:', {
      RESEND_API_KEY_EXISTS: !!process.env.RESEND_API_KEY,
      RESEND_API_KEY_PREFIX: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 5) + '...' : 'not set',
      CLIENT_EMAIL: process.env.CLIENT_EMAIL || 'using default',
    });

    // Prepare email parameters
    const emailParams = {
      from: 'Ship Your Car Safely <onboarding@resend.dev>',
      to: [clientEmail],
      cc: [parsedData.email], // Send a copy to the customer as well
      subject: `New Quote Request: ${parsedData.from} to ${parsedData.to}`,
      html: emailContent,
      replyTo: parsedData.email,
    };
    
    console.log('Email parameters:', {
      from: emailParams.from,
      to: emailParams.to,
      cc: emailParams.cc,
      subject: emailParams.subject,
      replyTo: emailParams.replyTo,
    });

    try {
      // Send email
      const { data, error } = await resend.emails.send(emailParams);

      if (error) {
        console.error('Resend API error details:', JSON.stringify(error));
        return json({ error: 'Failed to send email: ' + error.message }, { status: 500 });
      }
      
      console.log('Email sent successfully:', data);
      return json({ success: true, messageId: data?.id });
    } catch (sendError) {
      console.error('Exception during email sending:', sendError);
      return json({ error: 'Exception during email sending: ' + (sendError instanceof Error ? sendError.message : String(sendError)) }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing form submission:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}
