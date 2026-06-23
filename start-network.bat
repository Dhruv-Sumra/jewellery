@echo off
echo.
echo ========================================
echo   Starting Silver Jewelry Website
echo   with Network Access
echo ========================================
echo.
echo Your IP Addresses:
ipconfig | findstr IPv4
echo.
echo ========================================
echo.
echo Starting development server...
echo Access from other devices at:
echo   http://10.7.33.244:3000
echo   or
echo   http://172.29.16.1:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npm run dev -- -H 0.0.0.0

pause
