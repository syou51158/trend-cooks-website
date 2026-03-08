# SSH deployment script for Lolipop server
$sshHost = "ssh.lolipop.jp"
$sshUser = "deci.jp-trendcompany"
$sshPort = "2222"
$sshPassword = "qBG0VbNLMdsrV4RHSMSTmwz0Tx9wk2fS"

# Create secure string for password
$securePassword = ConvertTo-SecureString $sshPassword -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential ($sshUser, $securePassword)

Write-Host "Starting SSH deployment to Lolipop server..."

# Step 1: Create directory structure on server
Write-Host "Creating directory structure on server..."
$createDirCommand = "mkdir -p web/trendcooks"
$sshCommand = "ssh -p $sshPort ${sshUser}@${sshHost} '$createDirCommand'"

# Use plink if available (from PuTTY)
if (Get-Command plink -ErrorAction SilentlyContinue) {
    Write-Host "Using plink for SSH connection..."
    echo y | plink -ssh -P $sshPort -l $sshUser -pw $sshPassword $sshHost $createDirCommand
    
    # Step 2: Upload files using pscp
    Write-Host "Uploading files using pscp..."
    echo y | pscp -P $sshPort -r dist/* ${sshUser}@${sshHost}:web/trendcooks/
} else {
    Write-Host "PuTTY not found. Please install PuTTY or use manual method."
    Write-Host "Manual SSH command:"
    Write-Host "ssh -p $sshPort ${sshUser}@${sshHost}"
    Write-Host "Password: $sshPassword"
    Write-Host ""
    Write-Host "Then run on server:"
    Write-Host "mkdir -p web/trendcooks"
    Write-Host ""
    Write-Host "Manual SCP command:"
    Write-Host "scp -P $sshPort -r dist/* ${sshUser}@${sshHost}:~/web/trendcooks/"
}

Write-Host "Deployment script completed." 