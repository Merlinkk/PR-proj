// Email API route handler (create this at /api/send-email/route.ts)
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
    },
});

// Modern dark theme styles
const emailStyles = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    .email-container {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .email-header {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
      padding: 40px 30px;
      text-align: center;
      position: relative;
      border-bottom: 1px solid #333;
    }
    
    .email-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="50" cy="50" r="1" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.3;
    }
    
    .logo {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.02em;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      position: relative;
      z-index: 1;
    }
    
    .logo-img {
      width: 64px;
      height: 64px;
      object-fit: contain;
      max-width: 100%;
      max-height: 100%;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
    }
    
    .email-body {
      padding: 40px 30px;
      background: #0f0f0f;
    }
    
    .greeting {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 20px 0;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .content-text {
      font-size: 16px;
      line-height: 1.6;
      color: #e5e5e5;
      margin: 16px 0;
      font-weight: 400;
    }
    
    .highlight-box {
      background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
      border: 1px solid #333;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
      position: relative;
      overflow: hidden;
    }
    
    .highlight-box::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
    }
    
    .field-row {
      display: flex;
      margin: 12px 0;
      align-items: center;
    }
    
    .field-label {
      font-weight: 600;
      color: #a1a1aa;
      min-width: 100px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .field-value {
      color: #ffffff;
      font-weight: 500;
      flex: 1;
    }
    
    .message-box {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      position: relative;
    }
    
    .message-content {
      color: #e5e5e5;
      font-size: 15px;
      line-height: 1.6;
      white-space: pre-wrap;
      margin: 0;
    }
    
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }
    
    .email-footer {
      background: #0a0a0a;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #333;
    }
    
    .signature {
      color: #ffffff;
      font-weight: 500;
      margin: 0 0 20px 0;
      font-size: 16px;
    }
    
    .company-name {
      color: #6366f1;
      font-weight: 600;
    }
    
    .footer-text {
      font-size: 13px;
      color: #71717a;
      margin: 0;
      line-height: 1.5;
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #333, transparent);
      margin: 24px 0;
      border: none;
    }
    
    @media (max-width: 600px) {
      .email-container {
        margin: 0;
        border-radius: 0;
      }
      
      .email-header, .email-body, .email-footer {
        padding: 24px 20px;
      }
      
      .field-row {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .field-label {
        margin-bottom: 4px;
        min-width: auto;
      }
      
      .logo-img {
        width: 56px;
        height: 56px;
      }
    }
  </style>
`;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, to, userName, contactData } = body;

        if (type === 'user_confirmation') {
            // Send confirmation email to user
            const mailOptions = {
                from: `"NEST" <${process.env.GMAIL_USER}>`,
                to: to,
                subject: "✨ We've received your message!",
                html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Message Received - NEST</title>
            ${emailStyles}
          </head>
          <body style="margin: 0; padding: 20px; background: #000000;">
            <div class="email-container">
              <div class="email-header">
                <img src="https://nest-gamma-sable.vercel.app/icon.ico" alt="NEST Logo" class="logo-img" />
              </div>
              
              <div class="email-body">
                <h2 class="greeting">Thank you for reaching out!</h2>
                
                <p class="content-text">Hi <strong>${userName}</strong>,</p>
                
                <p class="content-text">
                  We've successfully received your message and truly appreciate you taking the time to connect with us. 
                  Your inquiry is important to us, and we're excited to help you achieve your goals.
                </p>
                
                <div class="highlight-box">
                  <p class="content-text" style="margin: 0; text-align: center;">
                    <strong>⚡ Our team typically responds within 24-48 hours</strong>
                  </p>
                </div>
                
                <p class="content-text">
                  While you wait, feel free to explore our latest updates and insights. If you have any urgent questions, 
                  don't hesitate to reach out to us directly.
                </p>
                
                <hr class="divider">
                
                <p class="content-text" style="margin-bottom: 0;">
                  We're looking forward to working with you and will be in touch soon.
                </p>
              </div>
              
              <div class="email-footer">
                <p class="signature">Best regards,<br><span class="company-name">The NEST Team</span></p>
                <p class="footer-text">
                  This is an automated confirmation message. Please do not reply to this email.<br>
                  For immediate assistance, please contact us through our website.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('User confirmation email sent:', info.messageId);
            return NextResponse.json({ success: true, messageId: info.messageId });

        } else if (type === 'admin_notification') {
            // Send notification email to admins
            const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [process.env.GMAIL_USER];

            const mailOptions = {
                from: `"New Lead Alert 🚀" <${process.env.GMAIL_USER}>`,
                to: adminEmails,
                replyTo: contactData.email, // Allow easy reply to the person who submitted
                subject: `💼 New contact from ${contactData.name} - ${contactData.company}`,
                html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Submission</title>
            ${emailStyles}
          </head>
          <body style="margin: 0; padding: 20px; background: #000000;">
            <div class="email-container">
              <div class="email-header">
                <img src="https://nest-gamma-sable.vercel.app/icon.ico" alt="NEST Logo" class="logo-img" />
                <h1 class="logo"> NEW CONNECT!</h1>
              </div>
              
              <div class="email-body">
                <h2 class="greeting">New Contact Form Submission</h2>
                
                <p class="content-text">
                  A new potential client has reached out through your website. Here are the details:
                </p>
                
                <div class="highlight-box">
                  <div class="field-row">
                    <span class="field-label">Name:</span>
                    <span class="field-value">${contactData.name}</span>
                  </div>
                  <div class="field-row">
                    <span class="field-label">Email:</span>
                    <span class="field-value">${contactData.email}</span>
                  </div>
                  <div class="field-row">
                    <span class="field-label">Company:</span>
                    <span class="field-value">${contactData.company}</span>
                  </div>
                  <div class="field-row">
                    <span class="field-label">Submitted:</span>
                    <span class="field-value">${contactData.submittedAt}</span>
                  </div>
                </div>
                
                <h3 style="color: #6366f1; font-weight: 600; margin: 24px 0 16px 0;">Message:</h3>
                <div class="message-box">
                  <p class="message-content">${contactData.message}</p>
                </div>
                
                <div style="text-align: center; margin: 32px 0;">
                  <a href="mailto:${contactData.email}" class="cta-button">
                    📧 Reply to ${contactData.name}
                  </a>
                </div>
                
                <hr class="divider">
                
                <p class="content-text" style="text-align: center; margin: 0;">
                  <strong>Quick Reply:</strong> 
                  <a href="mailto:${contactData.email}" style="color: #6366f1; text-decoration: none; font-weight: 500;">
                    ${contactData.email}
                  </a>
                </p>
              </div>
              
              <div class="email-footer">
                <p class="signature">
                  <span class="company-name">NEST Admin Panel</span>
                </p>
                <p class="footer-text">
                  This notification was automatically generated from your contact form.<br>
                  Response time goal: Within 24 hours for optimal client experience.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
            };

            // @ts-expect-error do it later
            const info = await transporter.sendMail(mailOptions);
            // @ts-expect-error do it later
            console.log('Admin notification email sent:', info.messageId);
            // @ts-expect-error do it later
            return NextResponse.json({ success: true, messageId: info.messageId });
        }

        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });

    } catch (error) {
        console.error('Email API error:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}