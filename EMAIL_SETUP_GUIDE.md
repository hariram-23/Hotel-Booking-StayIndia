# Email Setup Guide for StayIndia

## Overview

StayIndia uses **Brevo** (formerly Sendinblue) for sending transactional emails. This guide will help you configure email functionality for OTP verification, booking confirmations, and check-in reminders.

## Why Brevo?

We switched from Gmail/Nodemailer to Brevo for several reasons:
- **Better deliverability**: Professional email service with high delivery rates
- **No spam issues**: Emails don't end up in spam folders
- **Free tier**: 300 emails per day (perfect for development and small production)
- **Easy setup**: Simple API key configuration
- **Professional**: No app passwords or 2FA complications
- **Analytics**: Track email delivery and opens

## Quick Setup (5 minutes)

### 1. Create Brevo Account
1. Go to [https://www.brevo.com](https://www.brevo.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get API Key
1. Log in to Brevo dashboard
2. Go to "SMTP & API" → "API Keys"
3. Click "Generate a new API key"
4. Copy the API key (save it securely!)

### 3. Verify Sender Email
1. Go to "Senders, Domains & Dedicated IPs"
2. Click "Add a sender"
3. Enter your email address
4. Verify it via the email Brevo sends you

### 4. Configure Application
Edit `backend/.env`:
```env
BREVO_API_KEY=xkeysib-your-actual-api-key-here
BREVO_SENDER_EMAIL=your-verified-email@example.com
```

### 5. Test
```bash
cd backend
npm start
```
Try the forgot password feature to test email sending!

## Detailed Setup Instructions

See [BREVO_SETUP_GUIDE.md](./BREVO_SETUP_GUIDE.md) for complete step-by-step instructions.

## Email Features

### 1. Password Reset OTP
- Sent when user clicks "Forgot Password"
- Contains 6-digit OTP code
- Valid for 10 minutes
- Beautiful HTML template with gradient design

### 2. Booking Confirmation
- Sent immediately after booking
- Includes booking details, dates, and total price
- Professional confirmation template

### 3. Check-in Reminder
- Scheduled for 8 AM on check-in date
- Friendly reminder with checklist
- Helps users prepare for their stay

## Environment Variables

Required in `backend/.env`:
```env
# Brevo Configuration
BREVO_API_KEY=your-brevo-api-key
BREVO_SENDER_EMAIL=your-verified-sender-email@example.com

# Database
MONGODB_URI=your-mongodb-uri
PORT=5000
SESSION_SECRET=your-session-secret
NODE_ENV=development
```

## Testing Emails

### Test OTP Email:
1. Go to login page
2. Click "Forgot Password"
3. Enter your email
4. Check your inbox for OTP

### Test Booking Emails:
1. Login as a user
2. Book a property
3. Check your inbox for:
   - Immediate booking confirmation
   - Check-in reminder (on check-in date)

## Troubleshooting

### Emails not received?
- Check spam/junk folder
- Verify sender email in Brevo dashboard
- Check API key is correct
- Ensure you haven't exceeded 300 emails/day limit

### "API key is invalid" error?
- Copy the entire API key without spaces
- Regenerate a new key if needed
- Restart backend server after changing .env

### "Sender email not verified"?
- Complete email verification in Brevo
- Wait a few minutes after verification
- Check Brevo dashboard for sender status

## Free Tier Limits

Brevo free tier includes:
- ✅ 300 emails per day
- ✅ Unlimited contacts
- ✅ Email templates
- ✅ Basic analytics
- ✅ API access

Perfect for development and small-scale production!

## Production Recommendations

1. **Use custom domain email**: noreply@yourdomain.com
2. **Set up SPF/DKIM records**: For better deliverability
3. **Monitor analytics**: Track delivery and open rates
4. **Upgrade if needed**: Paid plans for higher volume

## Support

- **Brevo Docs**: [https://developers.brevo.com](https://developers.brevo.com)
- **Detailed Guide**: See [BREVO_SETUP_GUIDE.md](./BREVO_SETUP_GUIDE.md)
- **Application Logs**: Check backend console for errors

---

**Email functionality ready!** 📧✨
