@echo off
echo Testing Production Build...
echo.

echo Testing Backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Backend npm install failed
    exit /b 1
)
echo Backend dependencies installed
echo.

echo Testing Frontend Build...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Frontend npm install failed
    exit /b 1
)
echo Frontend dependencies installed

call npm run build
if %errorlevel% neq 0 (
    echo Frontend build failed
    exit /b 1
)
echo Frontend build successful
echo.

echo All tests passed! Ready for deployment.
echo.
echo Next steps:
echo 1. Push to GitHub: git push origin main
echo 2. Deploy backend to Render
echo 3. Deploy frontend to Vercel/Render
echo 4. Update environment variables
echo 5. Test production deployment

cd ..
