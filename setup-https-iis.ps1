# IIS HTTPS Setup Script for WorkCheck PWA
# Run as Administrator

param(
    [string]$SiteName = "WorkCheckPWAOffline",
    [string]$CertName = "WorkCheckPWA-SelfSigned",
    [int]$HttpsPort = 443
)

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "IIS HTTPS Setup for WorkCheck PWA" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check admin privileges
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
$isAdmin = $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: Admin privileges required." -ForegroundColor Red
    exit 1
}

# Import WebAdministration module
Import-Module WebAdministration

Write-Host "1. Creating self-signed certificate..." -ForegroundColor Green

# Get computer name for certificate
$computerName = $env:COMPUTERNAME
$dnsName = "$computerName.local"

# Check if certificate already exists
$existingCert = Get-ChildItem -Path Cert:\LocalMachine\My | Where-Object { $_.Subject -like "*$CertName*" } | Select-Object -First 1

if ($existingCert) {
    Write-Host "   Existing certificate found: $($existingCert.Thumbprint)" -ForegroundColor Yellow
    $cert = $existingCert
} else {
    # Create new self-signed certificate
    $cert = New-SelfSignedCertificate `
        -DnsName $computerName, $dnsName, "localhost", "127.0.0.1" `
        -CertStoreLocation "Cert:\LocalMachine\My" `
        -FriendlyName $CertName `
        -NotAfter (Get-Date).AddYears(5)
    
    Write-Host "   OK: Certificate created" -ForegroundColor Gray
    Write-Host "   Thumbprint: $($cert.Thumbprint)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "2. Configuring IIS HTTPS binding..." -ForegroundColor Green

# Check if site exists
$site = Get-Website -Name $SiteName -ErrorAction SilentlyContinue
if (-not $site) {
    Write-Host "   ERROR: Site '$SiteName' not found" -ForegroundColor Red
    Write-Host "   Please deploy the site first using deploy-to-iis.ps1" -ForegroundColor Yellow
    exit 1
}

# Remove existing HTTPS binding if exists
$existingBinding = Get-WebBinding -Name $SiteName -Protocol "https" -Port $HttpsPort -ErrorAction SilentlyContinue
if ($existingBinding) {
    Write-Host "   Removing existing HTTPS binding..." -ForegroundColor Yellow
    Remove-WebBinding -Name $SiteName -Protocol "https" -Port $HttpsPort
}

# Add new HTTPS binding
New-WebBinding -Name $SiteName -Protocol "https" -Port $HttpsPort -SslFlags 0

# Bind certificate to HTTPS binding
$binding = Get-WebBinding -Name $SiteName -Protocol "https" -Port $HttpsPort
$binding.AddSslCertificate($cert.Thumbprint, "My")

Write-Host "   OK: HTTPS binding configured" -ForegroundColor Gray

Write-Host ""
Write-Host "3. Getting network information..." -ForegroundColor Green

# Get local IP addresses
$ipAddresses = Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.*" } |
    Select-Object -ExpandProperty IPAddress

Write-Host "   Available IP addresses:" -ForegroundColor Gray
foreach ($ip in $ipAddresses) {
    Write-Host "   - $ip" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "HTTPS Setup Complete!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Access URLs:" -ForegroundColor White
Write-Host "  HTTPS: https://localhost:$HttpsPort/" -ForegroundColor Cyan
Write-Host "  HTTPS: https://${computerName}:$HttpsPort/" -ForegroundColor Cyan
foreach ($ip in $ipAddresses) {
    Write-Host "  HTTPS: https://${ip}:$HttpsPort/" -ForegroundColor Cyan
}
Write-Host ""
Write-Host "For iPhone/iPad access:" -ForegroundColor Yellow
Write-Host "  1. Connect your device to the same Wi-Fi network" -ForegroundColor Gray
Write-Host "  2. On iPhone, open Safari and go to: https://${computerName}:$HttpsPort/" -ForegroundColor Gray
Write-Host "  3. Accept the certificate warning (tap 'Advanced' then 'Proceed')" -ForegroundColor Gray
Write-Host "  4. Tap the Share button and select 'Add to Home Screen'" -ForegroundColor Gray
Write-Host "  5. The app will work offline after initial load!" -ForegroundColor Gray
Write-Host ""
Write-Host "Note: You may see a security warning about the self-signed certificate." -ForegroundColor Yellow
Write-Host "This is normal for development. Tap 'Advanced' and 'Proceed' to continue." -ForegroundColor Yellow
Write-Host ""

