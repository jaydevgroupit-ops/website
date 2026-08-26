@echo off
echo Starting Jaydev Group website...
echo Run this script from the project root after installing dependencies.
echo Development server will start at http://localhost:3000
npm install
npm run dev -- --hostname 0.0.0.0 --port 3000
pause
