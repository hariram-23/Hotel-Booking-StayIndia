#!/bin/bash

echo "🧪 Testing Production Build..."
echo ""

# Test Backend
echo "📦 Testing Backend..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend npm install failed"
    exit 1
fi
echo "✅ Backend dependencies installed"
echo ""

# Test Frontend Build
echo "📦 Testing Frontend Build..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend npm install failed"
    exit 1
fi
echo "✅ Frontend dependencies installed"

npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi
echo "✅ Frontend build successful"
echo ""

echo "🎉 All tests passed! Ready for deployment."
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Deploy backend to Render"
echo "3. Deploy frontend to Vercel/Render"
echo "4. Update environment variables"
echo "5. Test production deployment"
