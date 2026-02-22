const brevo = require('@getbrevo/brevo');

// Initialize Brevo API client
let apiInstance = new brevo.TransactionalEmailsApi();
let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = 'Password Reset OTP - StayIndia';
  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #E61E4D, #D70466); padding: 40px 20px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 40px 30px; }
        .otp-box { background: #f9f9f9; border: 2px dashed #E61E4D; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0; }
        .otp { font-size: 36px; font-weight: bold; color: #E61E4D; letter-spacing: 8px; }
        .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #717171; font-size: 12px; }
        .button { display: inline-block; background: linear-gradient(135deg, #E61E4D, #D70466); color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 StayIndia</h1>
          <p>Password Reset Request</p>
        </div>
        <div class="content">
          <h2>Hello!</h2>
          <p>We received a request to reset your password. Use the OTP below to proceed:</p>
          
          <div class="otp-box">
            <p style="margin: 0; color: #717171; font-size: 14px;">Your OTP Code</p>
            <div class="otp">${otp}</div>
            <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">Valid for 10 minutes</p>
          </div>
          
          <p><strong>Important:</strong></p>
          <ul style="color: #717171; line-height: 1.8;">
            <li>This OTP is valid for 10 minutes only</li>
            <li>Do not share this OTP with anyone</li>
            <li>If you didn't request this, please ignore this email</li>
          </ul>
          
          <p>Best regards,<br><strong>StayIndia Team</strong></p>
        </div>
        <div class="footer">
          <p>© 2024 StayIndia. All rights reserved.</p>
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  sendSmtpEmail.sender = { name: 'StayIndia', email: process.env.BREVO_SENDER_EMAIL };
  sendSmtpEmail.to = [{ email: email }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
};

// Send Booking Confirmation Email
const sendBookingConfirmationEmail = async (userEmail, userName, bookingDetails) => {
  const { listingTitle, checkIn, checkOut, totalPrice, nights } = bookingDetails;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = '✅ Booking Confirmed - StayIndia';
  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #22c55e, #16a34a); padding: 40px 20px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 40px 30px; }
        .booking-card { background: #f9f9f9; border-left: 4px solid #22c55e; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
        .detail-label { color: #717171; font-weight: 600; }
        .detail-value { color: #222; font-weight: bold; }
        .total-price { font-size: 24px; color: #E61E4D; text-align: center; margin: 20px 0; }
        .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #717171; font-size: 12px; }
        .success-icon { font-size: 60px; text-align: center; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 StayIndia</h1>
          <p>Booking Confirmation</p>
        </div>
        <div class="content">
          <div class="success-icon">✅</div>
          <h2 style="text-align: center; color: #22c55e;">Booking Confirmed!</h2>
          <p>Dear ${userName},</p>
          <p>Great news! Your booking has been confirmed. We're excited to host you!</p>
          
          <div class="booking-card">
            <h3 style="margin-top: 0; color: #222;">📍 ${listingTitle}</h3>
            <div class="detail-row">
              <span class="detail-label">Check-in:</span>
              <span class="detail-value">${new Date(checkIn).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Check-out:</span>
              <span class="detail-value">${new Date(checkOut).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Duration:</span>
              <span class="detail-value">${nights} night${nights > 1 ? 's' : ''}</span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">Total Amount:</span>
              <span class="detail-value" style="color: #E61E4D;">₹${totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
          
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;"><strong>📧 Check-in Reminder:</strong> We'll send you a reminder email on your check-in date!</p>
          </div>
          
          <p><strong>What's Next?</strong></p>
          <ul style="color: #717171; line-height: 1.8;">
            <li>Save this confirmation email for your records</li>
            <li>You'll receive a reminder on your check-in date</li>
            <li>Contact the property if you have any questions</li>
            <li>View your booking anytime in "My Bookings"</li>
          </ul>
          
          <p>Have a wonderful stay!</p>
          <p>Best regards,<br><strong>StayIndia Team</strong></p>
        </div>
        <div class="footer">
          <p>© 2024 StayIndia. All rights reserved.</p>
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  sendSmtpEmail.sender = { name: 'StayIndia', email: process.env.BREVO_SENDER_EMAIL };
  sendSmtpEmail.to = [{ email: userEmail, name: userName }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.error('Booking confirmation email error:', error);
    throw new Error('Failed to send booking confirmation email');
  }
};

// Send Check-in Reminder Email
const sendCheckInReminderEmail = async (userEmail, userName, bookingDetails) => {
  const { listingTitle, checkIn, checkOut, totalPrice } = bookingDetails;
  
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = '🔔 Check-in Reminder - Your Stay Begins Today!';
  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #3b82f6, #2563eb); padding: 40px 20px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 40px 30px; }
        .reminder-icon { font-size: 60px; text-align: center; margin: 20px 0; }
        .booking-card { background: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #717171; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 StayIndia</h1>
          <p>Check-in Reminder</p>
        </div>
        <div class="content">
          <div class="reminder-icon">🔔</div>
          <h2 style="text-align: center; color: #3b82f6;">Your Stay Begins Today!</h2>
          <p>Dear ${userName},</p>
          <p>This is a friendly reminder that your check-in date is <strong>today</strong>! We hope you're excited for your stay.</p>
          
          <div class="booking-card">
            <h3 style="margin-top: 0; color: #222;">📍 ${listingTitle}</h3>
            <p><strong>Check-in:</strong> ${new Date(checkIn).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Check-out:</strong> ${new Date(checkOut).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <p><strong>Before You Go:</strong></p>
          <ul style="color: #717171; line-height: 1.8;">
            <li>✓ Confirm your check-in time with the property</li>
            <li>✓ Bring a valid ID for verification</li>
            <li>✓ Have your booking confirmation ready</li>
            <li>✓ Check the weather and pack accordingly</li>
          </ul>
          
          <p>Have a wonderful stay! If you need any assistance, feel free to contact us.</p>
          <p>Best regards,<br><strong>StayIndia Team</strong></p>
        </div>
        <div class="footer">
          <p>© 2024 StayIndia. All rights reserved.</p>
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  sendSmtpEmail.sender = { name: 'StayIndia', email: process.env.BREVO_SENDER_EMAIL };
  sendSmtpEmail.to = [{ email: userEmail, name: userName }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.error('Check-in reminder email error:', error);
    throw new Error('Failed to send check-in reminder email');
  }
};

module.exports = { sendOTPEmail, generateOTP, sendBookingConfirmationEmail, sendCheckInReminderEmail };
