@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Install a supported Node.js version, then try again.
  pause
  exit /b 1
)
if not exist "node_modules\.bin\vite.cmd" (
  echo Installing the frontend dependencies...
  set "NODE_USE_SYSTEM_CA=1"
  call npm.cmd install --no-fund
  if errorlevel 1 (
    echo Dependency installation failed. Please review the message above.
    pause
    exit /b 1
  )
)
echo Starting the Coup login preview.
echo Closing this window stops the preview server. Ctrl+C also stops it.
echo If another preview is open, an available port will be used.
set "previewOpenFlag=--open"
if /I "%~1"=="--no-open" set "previewOpenFlag="
cd /d "%~dp0frontend"
node "%~dp0node_modules\vite\bin\vite.js" --host 127.0.0.1 %previewOpenFlag%
set "previewExitCode=%errorlevel%"
if not "%previewExitCode%"=="0" pause
exit /b %previewExitCode%
