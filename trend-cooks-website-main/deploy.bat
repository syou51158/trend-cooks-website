@echo off
echo ============================================
echo SSH Deployment to Lolipop Server
echo ============================================
echo.
echo Step 1: SSH Connection
echo Copy and paste this command:
echo ssh -p 2222 deci.jp-trendcompany@ssh.lolipop.jp
echo.
echo Password: qBG0VbNLMdsrV4RHSMSTmwz0Tx9wk2fS
echo.
echo Step 2: On the server, run:
echo mkdir -p web/trendcooks
echo ls -la web/
echo.
echo Step 3: In a new terminal, upload files:
echo scp -P 2222 -r dist/* deci.jp-trendcompany@ssh.lolipop.jp:~/web/trendcooks/
echo.
echo ============================================
echo Opening SSH connection...
echo ============================================
ssh -p 2222 deci.jp-trendcompany@ssh.lolipop.jp 