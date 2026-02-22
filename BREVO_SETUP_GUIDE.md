# Brevo Email Setup Guide

This guide will help you set up Brevo (formerly Sendinblue) for sending emails in the StayIndia application.

## What is Brevo?

Brevo is a professional email service provider that offers:
- **Free tier**: 300 emails per day
- **Reliable delivery**: Better deliverability than Gmail
- **Professional emails**: No spam folder issues
- **Easy setup**: Simple API integration
- **Email tracking**: Monitor delivery and opens

## Step-by-Step Setup

### 1. Create a Brevo Account

1. Go to [https://www.brevo.com](https://www.brevo.com)
2. Click "Sign up free"
3. Fill in your details:
   - Email address
   - Password
   - Company name (can be "StayIndia" or your name)
4. Verify your email address

### 2. Get Your API Key

1. Log in to your Brevo account
2. Click on your name in the top-right corner
3. Select "SMTP & API"
4. Click on "API Keys" tab
5. Click "Generate a new API key"
6. Give it a name (e.g., "StayIndia Production")
7. Copy the API key (you'll only see it once!)

### 3. Add a Sender Email

1. In Brevo dashboard, go to "Senders, Domains & Dedicated IPs"
2. Click "Add a sender"
3. Enter your email address (e.g., noreply@yourdomain.com or your Gmail)
4. Brevo will send a verification email
5. Click the verification link in the email
6. Your sender email is now verified!

**Note**: For the free tier, you can use any email you own. For production, use a domain email (e.g., noreply@stayindia.com).

### 4. Configure Your Application

1. Open `backend/.env` file
2. Replace the placeholder values:

```env
# Brevo Email Configuration
BREVO_API_KEY=xkeysib-your-actual-api-key-here
BREVO_SENDER_EMAIL=your-verified-email@example.com
```

Example:
```env
BREVO_API_KEY=xkeysib-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
BREVO_SENDER_EMAIL=noreply@stayindia.com
```

### 5. Test Your Setup

1. Start your backend server:
   ```bash
   cd backend
   npm start
   ```

2. Try the forgot password feature:
   - Go to login page
   - Click "Forgot Password"
   - Enter your email
   - Check if you receive the OTP email

3. Try booking a property:
   - Make a reservation
   - Check if you receive the booking confirmation email

## Email Features in StayIndia

The application sends three types of emails:

### 1. Password Reset OTP
- **Trigger**: User clicks "Forgot Password"
- **Content**: 6-digit OTP code
- **Validity**: 10 minutes
- **Template**: Beautiful HTML with gradient header

### 2. Booking Confirmation
- **Trigger**: User completes a booking
- **Content**: Booking details, check-in/out dates, total price
- **Template**: Professional confirmation with booking card

### 3. Check-in Reminder
- **Trigger**: Scheduled for 8 AM on check-in date
- **Content**: Reminder with booking details and checklist
- **Template**: Friendly reminder with tips

## Brevo Free Tier Limits

- **300 emails per day**: Perfect for development and small-scale production
- **Unlimited contacts**: Store as many email addresses as you need
- **Email templates**: Create and save custom templates
- **Basic analytics**: Track opens and clicks

## Troubleshooting

### Issue: "API key is invalid"
**Solution**: 
- Make sure you copied the entire API key
- Check for extra spaces in the .env file
- Regenerate a new API key if needed

### Issue: "Sender email not verified"
**Solution**:
- Check your email for the verification link
- Add the sender email in Brevo dashboard
- Wait a few minutes after verification

### Issue: "Emails not being received"
**Solution**:
- Check spam/junk folder
- Verify sender email is properly configured
- Check Brevo dashboard for delivery status
- Ensure you haven't exceeded daily limit (300 emails)

### Issue: "Failed to send email" error
**Solution**:
- Check your internet connection
- Verify API key is correct in .env file
- Restart the backend server after changing .env
- Check Brevo dashboard for account status

## Production Recommendations

For production deployment:

1. **Use a custom domain email**: 
   - Instead of Gmail, use noreply@yourdomain.com
   - Better deliverability and professional appearance

2. **Upgrade if needed**:
   - If you need more than 300 emails/day
   - Brevo paid plans start at $25/month for 20,000 emails

3. **Set up SPF and DKIM**:
   - Configure DNS records for better deliverability
   - Brevo provides instructions in the dashboard

4. **Monitor email analytics**:
   - Track delivery rates
   - Monitor bounce rates
   - Check open rates

## Environment Variables Reference

```env
# Required for Brevo email functionality
BREVO_API_KEY=your-brevo-api-key
BREVO_SENDER_EMAIL=your-verified-sender-email

# Other required variables
MONGODB_URI=your-mongodb-connection-string
PORT=5000
SESSION_SECRET=your-session-secret
NODE_ENV=production
```

## Support

- **Brevo Documentation**: [https://developers.brevo.com](https://developers.brevo.com)
- **Brevo Support**: Available in dashboard
- **StayIndia Issues**: Check application logs for detailed error messages

## Migration from Nodemailer

The application has been migrated from Nodemailer (Gmail) to Brevo for better reliability and deliverability. The email templates and functionality remain the same, only the sending mechanism has changed.

**Benefits of Brevo over Gmail**:
- ✅ No app password needed
- ✅ Better deliverability (less spam)
- ✅ Professional email service
- ✅ Email analytics and tracking
- ✅ Higher sending limits
- ✅ No 2FA complications

---

**Ready to send emails!** 🚀

Once configured, your StayIndia application will send beautiful, professional emails for OTP verification, booking confirmations, and check-in reminders.
