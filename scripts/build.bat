@echo off
echo [Aurora] Setting up MSVC environment...
call "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvarsall.bat" x64
if errorlevel 1 (
    echo [Aurora] ERROR: MSVC not found. Install Visual Studio Build Tools 2022.
    pause
    exit /b 1
)
echo [Aurora] Building release...
cd /d "%~dp0.."
npm run tauri build
