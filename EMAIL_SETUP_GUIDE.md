# Email Setup Guide for Forgot Password Feature

## Gmail App Password Setup

### Step 1: Enable 2-Step Verification
1. Go to: **https://myaccount.google.com/security**
2. Scroll down to "How you sign in to Google"
3. Click on "2-Step Verification"
4. Follow the prompts to enable it (you'll need your phone)

### Step 2: Generate App Password
1. Go to: **https://myaccount.google.com/apppasswords**
2. You may need to sign in again
3. Under "Select app", choose **"Mail"**
4. Under "Select device", choose **"Other (Custom name)"**
5. Enter a name like: **"StayIndia Booking System"**
6. Click **"Generate"**
7. Google will show you a 16-character password like: `xxxx xxxx xxxx xxxx`
8. **Copy this password** (you won't be able to see it again)

### Step 3: Update Backend Configuration
1. Open `backend/.env` file
2. Find the line: `EMAIL_PASSWORD=your-gmail-app-password-here`
3. Replace with your app password (remove spaces):
   ```
   EMAIL_PASSWORD=abcdabcdabcdabcd
   ```
4. Save the file

### Step 4: Restart Backend Server
```bash
cd backend
npm start
```

## Testing the Feature

### Test Forgot Password Flow:
1. Go to login page: http://localhost:5173/login
2. Click "Forgot password?"
3. Enter a registered email address
4. Click "Send OTP"
5. Check the email inbox for OTP
6. Enter the 6-digit OTP
7. Set a new password
8. Login with the new password

## Email Configuration Details

**Sender Email:** hotelbooking356@gmail.com  
**Service:** Gmail SMTP  
**Port:** 587 (TLS)  
**OTP Validity:** 10 minutes

## Troubleshooting

### "Invalid credentials" error:
- Make sure 2-Step Verification is enabled
- Regenerate the app password
- Remove any spaces from the password in .env
- Restart the backend server

### Email not received:
- Check spam/junk folder
- Verify the email address is correct
- Check backend console for errors
- Ensure EMAIL_USER and EMAIL_PASSWORD are set correctly

### "Less secure app access" error:
- This is outdated - use App Passwords instead
- App Passwords work with 2-Step Verification

## Alternative: Using Other Email Services

If you want to use a different email service, update `backend/config/email.js`:

### For Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'your-email@outlook.com',
    pass: 'your-password'
  }
});
```

### For Custom SMTP:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@example.com',
    pass: 'your-password'
  }
});
```

## Security Notes

- Never commit the .env file to Git
- Keep your app password secure
- Rotate app passwords periodically
- Use environment variables in production
- Consider using a dedicated email service like SendGrid or AWS SES for production

## Production Recommendations

For production deployment, consider:
1. **SendGrid** - Free tier: 100 emails/day
2. **AWS SES** - Pay as you go, very cheap
3. **Mailgun** - Free tier: 5,000 emails/month
4. **Postmark** - Reliable transactional emails

These services provide better deliverability and analytics than Gmail.
