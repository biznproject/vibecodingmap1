@echo off
chcp 65001 > nul
title VibeCodingMap - Local Agent Factory
color 0B

:menu
cls
echo ===================================================================
echo     V I B E C O D I N G M A P  -  L O C A L   A G E N T   F A C T O R Y
echo ===================================================================
echo.
echo     [1] Run Batch Mode  - Immediate spec generation & Supabase upload
echo     [2] Run Daemon Mode - 24/7 background production loop (Every 1 hour)
echo     [3] Check Connection - Test Supabase table access
echo     [4] Exit
echo.
echo ===================================================================
set /p opt="Select option (1-4): "

if "%opt%"=="1" (
    echo.
    echo [*] Launching Batch Mode...
    "C:\Users\human\AppData\Local\Programs\Python\Python312\python.exe" agent\autonomous_producer.py
    echo.
    echo [*] Done! Press any key to return to menu.
    pause > nul
    goto menu
)

if "%opt%"=="2" (
    echo.
    echo [*] Launching 24/7 Daemon Mode (Minimize this window to keep running)...
    "C:\Users\human\AppData\Local\Programs\Python\Python312\python.exe" agent\autonomous_producer.py --daemon --interval 3600
    goto menu
)

if "%opt%"=="3" (
    echo.
    echo [*] Testing connection to Supabase...
    "C:\Users\human\AppData\Local\Programs\Python\Python312\python.exe" -c "import json, urllib.request; req = urllib.request.Request('https://cdmrdzqrunysknhtxmft.supabase.co/rest/v1/x402_specs?select=slug&limit=1', headers={'apikey': 'sb_publishable_W_9ixCG60k-CsCmtaMI_mg_5BtNm7Xu', 'Authorization': 'Bearer sb_publishable_W_9ixCG60k-CsCmtaMI_mg_5BtNm7Xu'}); print('Supabase Connection: OK' if urllib.request.urlopen(req) else 'Failed')"
    echo.
    echo Press any key to return.
    pause > nul
    goto menu
)

if "%opt%"=="4" (
    exit
)

goto menu