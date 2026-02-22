# Brevo Email Configuration Guide

## ✅ Configuration Complete

Your application has been successfully configured to use **Brevo (formerly Sendinblue)** for sending emails.

## 📧 Email Configuration Details

- **Service**: Brevo API
- **Sender Email**: hotetbooking356@gmail.com
- **Sender Name**: StayIndia
- **API Key**: Configured in `.env` file

## 🔧 What Was Changed

1. **Replaced nodemailer with Brevo SDK** (`sib-api-v3-sdk`)
2. **Updated `backend/config/email.js`** to use Brevo's TransactionalEmailsApi
3. **Updated `backend/.env`** with Brevo API credentials

## 📨 Email Features

The following emails are sent via Brevo:

1. **OTP Email** - Password reset verification (6-digit code, valid 10 minutes)
2. **Booking Confirmation** - Sent immediately after successful reservation
3. **Check-in Reminder** - Scheduled for check-in date at 8 AM

## 🧪 Testing the Email Functionality

### Test Forgot Password Flow:

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Go to login page and click "Forgot Password"
4. Enter your email address
5. Check your inbox for the OTP email from StayIndia (hotetbooking356@gmail.com)
6. Enter the OTP and reset your password

### Test Booking Emails:

1. Login as a user
2. Book a property
3. Check your email for:
   - Immediate booking confirmation email
   - Check-in reminder (will be sent on check-in date)

## 🔍 Troubleshooting

If emails are not being sent:

1. **Check Brevo API Key**: Verify the API key in `.env` is correct
2. **Check Sender Email**: Ensure hotetbooking356@gmail.com is verified in Brevo
3. **Check Console Logs**: Look for error messages in the backend terminal
4. **Verify Brevo Account**: Login to Brevo dashboard and check:
   - API key is active
   - Sender email is verified
   - Account has available email credits

## 📊 Brevo Dashboard

Access your Brevo dashboard at: https://app.brevo.com/

Here you can:
- Monitor email delivery status
- View email statistics
- Check remaining email credits
- Manage sender addresses

## 🚀 Advantages of Brevo

- ✅ More reliable than Gmail SMTP
- ✅ Better deliverability rates
- ✅ Detailed email analytics
- ✅ No "less secure app" issues
- ✅ Professional email service
- ✅ Free tier includes 300 emails/day

## 📝 Environment Variables

Make sure these are set in `backend/.env`:

```env
BREVO_API_KEY=your-brevo-api-key-here
EMAIL_FROM=hotetbooking356@gmail.com
EMAIL_FROM_NAME=StayIndia
```

**Note**: Replace `your-brevo-api-key-here` with your actual Brevo API key from your Brevo dashboard.

## ✨ Ready to Use!

Your email system is now configured and ready to send emails through Brevo. Test the forgot password feature to verify everything is working correctly!
