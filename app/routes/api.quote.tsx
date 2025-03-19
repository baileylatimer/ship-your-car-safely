import { ActionFunction, json } from "@remix-run/node";
import { Resend } from "resend";
import { sanityClient } from "~/lib/sanity.client";

interface QuoteFormData {
  from: string;
  to: string;
  date: string;
  year: string;
  make: string;
  model: string;
  operable: 'yes' | 'no';
  name: string;
  email: string;
  phone?: string;
}

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set');
}

if (!process.env.CLIENT_EMAIL) {
  throw new Error('CLIENT_EMAIL environment variable is not set');
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
// Using Resend's default verified domain temporarily until shipyourcarsafely.com is verified
const EMAIL_FROM = "onboarding@resend.dev";
const EMAIL_FROM_NAME = "Ship Your Car Safely";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    console.log("API route called with method:", request.method);
    console.log("Environment variables loaded:", {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "Set (hidden)" : "Not set",
      CLIENT_EMAIL: process.env.CLIENT_EMAIL
    });
    
    const formData = await request.json() as QuoteFormData;
    console.log("Form data received:", { ...formData, email: "***@***.com" }); // Redact email for privacy
    const {
      from,
      to,
      date,
      year,
      make,
      model,
      operable,
      name,
      email,
      phone
    } = formData;

    // 1. Send email to client
    console.log("Attempting to send email to client:", process.env.CLIENT_EMAIL);
    const clientEmailResult = await resend.emails.send({
      from: `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`,
      to: [process.env.CLIENT_EMAIL as string], // Client's email address will be set in environment variables
      subject: "New Quote Request",
      html: `
        <h2>New Quote Request from ${name}</h2>
        
        <h3>Customer Information:</h3>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone || 'Not provided'}</p>
        
        <h3>Shipping Details:</h3>
        <p>From: ${from}</p>
        <p>To: ${to}</p>
        <p>Pickup Date: ${date}</p>
        
        <h3>Vehicle Information:</h3>
        <p>Year: ${year}</p>
        <p>Make: ${make}</p>
        <p>Model: ${model}</p>
        <p>Operable: ${operable}</p>
      `
    });
    
    // 2. Send confirmation email to customer
    console.log("Attempting to send confirmation email to customer:", email);
    const customerEmailResult = await resend.emails.send({
      from: `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`,
      to: [email],
      subject: "Your Quote Request Confirmation",
      html: `
        <h2>Thank you for your quote request, ${name}!</h2>
        
        <p>We've received your request and our team will be in touch with you shortly to provide you with a personalized quote for shipping your vehicle.</p>
        
        <h3>Your Request Details:</h3>
        
        <h4>Shipping Details:</h4>
        <p>From: ${from}</p>
        <p>To: ${to}</p>
        <p>Pickup Date: ${date}</p>
        
        <h4>Vehicle Information:</h4>
        <p>Year: ${year}</p>
        <p>Make: ${make}</p>
        <p>Model: ${model}</p>
        <p>Operable: ${operable === 'yes' ? 'Yes' : 'No'}</p>
        
        <p>If you have any questions or need to update your information, please contact us at <a href="tel:8887717774">(888) 771-7774</a> or reply to this email.</p>
        
        <p>Thank you for choosing Ship Your Car Safely!</p>
      `,
      replyTo: process.env.CLIENT_EMAIL as string
    });
    
    // 3. Save lead to Sanity CRM
    console.log("Saving lead to Sanity CRM...");
    
    try {
      // Only attempt to save to Sanity if we have a token
      if (process.env.SANITY_API_TOKEN) {
        const leadDocument = {
          _type: 'lead',
          name,
          email,
          phone: phone || undefined,
          fromLocation: from,
          toLocation: to,
          pickupDate: date,
          vehicleYear: year,
          vehicleMake: make,
          vehicleModel: model,
          isOperable: operable === 'yes',
          status: 'new',
          createdAt: new Date().toISOString()
        };
        
        const sanityResult = await sanityClient.create(leadDocument);
        console.log("Lead saved to Sanity:", sanityResult._id);
        
        return json({ 
          success: true, 
          emailData: {
            clientEmail: clientEmailResult,
            customerEmail: customerEmailResult
          },
          leadId: sanityResult._id
        });
      } else {
        console.log("Skipping Sanity CRM save - no API token provided");
      }
    } catch (sanityError) {
      console.error("Failed to save lead to Sanity:", sanityError);
      // Continue even if Sanity save fails - we still sent the emails
    }
    
    console.log("Emails sent successfully:", {
      clientEmail: clientEmailResult,
      customerEmail: customerEmailResult
    });
    
    return json({ 
      success: true, 
      emailData: {
        clientEmail: clientEmailResult,
        customerEmail: customerEmailResult
      }
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return json(
      { error: "Failed to process quote request" },
      { status: 500 }
    );
  }
};
