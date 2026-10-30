import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, service, description } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to business owner
    const businessEmailHtml = `
      <h2>New Quote Request - Jenkins & Sons</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Customer Information:</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Requested:</strong> ${service || 'Not specified'}</p>
      </div>
      
      <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Project Description:</h3>
        <p>${description || 'No description provided'}</p>
      </div>
      
      <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>Contact customer within 24 hours</li>
          <li>Schedule site visit if needed</li>
          <li>Provide detailed quote</li>
        </ul>
      </div>
    `;

    // Email to customer (confirmation)
    const customerEmailHtml = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #0891b2, #06b6d4); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Jenkins & Sons</h1>
          <p style="margin: 5px 0 0 0; font-size: 16px;">Tree & Outdoor Service</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #0891b2;">Thank you for your quote request!</h2>
          
          <p>Hi ${firstName},</p>
          
          <p>We've received your request for tree services and appreciate you considering Jenkins & Sons for your project.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0891b2;">
            <h3 style="margin-top: 0; color: #0891b2;">What happens next?</h3>
            <ul style="margin: 10px 0;">
              <li>We'll review your request within 24 hours</li>
              <li>One of our certified arborists will contact you</li>
              <li>We'll schedule a convenient time for a site visit</li>
              <li>You'll receive a detailed, no-obligation quote</li>
            </ul>
          </div>
          
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #059669;">Your Request Details:</h3>
            <p><strong>Service:</strong> ${service || 'General inquiry'}</p>
            <p><strong>Description:</strong> ${description || 'Will discuss during consultation'}</p>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #d97706;">Need immediate assistance?</h4>
            <p style="margin-bottom: 0;">For emergency tree services, call us at <strong>(555) 123-4567</strong></p>
          </div>
          
          <p>Thank you for choosing Jenkins & Sons!</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 14px; color: #6b7280;">
              <strong>Jenkins & Sons Tree & Outdoor Service</strong><br>
              Phone: (555) 123-4567<br>
              Email: info@jenkinssons.com<br>
              Serving Fredricksburg Area & Surrounding Counties
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email to business
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Quote Request from ${firstName} ${lastName}`,
      html: businessEmailHtml,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Quote Request Received - Jenkins & Sons Tree Service',
      html: customerEmailHtml,
    });

    return NextResponse.json(
      { message: 'Quote request sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send quote request. Please try again.' },
      { status: 500 }
    );
  }
}