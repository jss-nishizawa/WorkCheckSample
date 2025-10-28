# WorkCheck PWA - IIS Deploy Script
param(
    [string]$SiteName = "WorkCheckPWA",
    [string]$PhysicalPath = "C:\inetpub\wwwroot\WorkCheckPWA",
    [int]$Port = 80,
    [string]$HostName = ""
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "WorkCheck PWA - IIS Deploy Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
$isAdmin = $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: Admin privileges required." -ForegroundColor Red
    exit 1
}

Write-Host "1. Checking IIS module..." -ForegroundColor Green
if (-not (Get-Module -ListAvailable -Name WebAdministration)) {
    Write-Host "ERROR: IIS WebAdministration module not found." -ForegroundColor Red
    exit 1
}
Import-Module WebAdministration
Write-Host "   OK: IIS module loaded" -ForegroundColor Gray

Write-Host ""
Write-Host "2. Checking Node.js..." -ForegroundColor Green
try {
    $nodeVersion = node --version
    Write-Host "   OK: Node.js $nodeVersion" -ForegroundColor Gray
} catch {
    Write-Host "ERROR: Node.js not found." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "3. Building application..." -ForegroundColor Green
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed." -ForegroundColor Red
    exit 1
}
Write-Host "   OK: Build completed" -ForegroundColor Gray

if (-not (Test-Path "dist")) {
    Write-Host "ERROR: dist folder not found." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "4. Preparing target directory..." -ForegroundColor Green
if (-not (Test-Path $PhysicalPath)) {
    New-Item -ItemType Directory -Path $PhysicalPath -Force | Out-Null
    Write-Host "   OK: Directory created: $PhysicalPath" -ForegroundColor Gray
} else {
    Remove-Item -Path "$PhysicalPath\*" -Recurse -Force
    Write-Host "   OK: Existing files removed" -ForegroundColor Gray
}

Write-Host ""
Write-Host "5. Copying files..." -ForegroundColor Green
Copy-Item -Path "dist\*" -Destination $PhysicalPath -Recurse -Force
Write-Host "   OK: Files copied" -ForegroundColor Gray

Write-Host ""
Write-Host "6. Configuring IIS site..." -ForegroundColor Green
$site = Get-Website -Name $SiteName -ErrorAction SilentlyContinue
if ($site) {
    Write-Host "   Existing site found: $SiteName" -ForegroundColor Yellow
    $response = Read-Host "   Update existing site? (Y/N)"
    if ($response -eq "Y" -or $response -eq "y") {
        Set-ItemProperty "IIS:\Sites\$SiteName" -Name physicalPath -Value $PhysicalPath
        Write-Host "   OK: Site path updated" -ForegroundColor Gray
    }
} else {
    if ($HostName -ne "") {
        New-Website -Name $SiteName -PhysicalPath $PhysicalPath -Port $Port -HostHeader $HostName -Force | Out-Null
    } else {
        New-Website -Name $SiteName -PhysicalPath $PhysicalPath -Port $Port -Force | Out-Null
    }
    Write-Host "   OK: Site created: $SiteName" -ForegroundColor Gray
    Write-Host "   Port: $Port" -ForegroundColor Gray
}

Write-Host ""
Write-Host "7. Configuring application pool..." -ForegroundColor Green
$appPool = Get-Item "IIS:\AppPools\$SiteName" -ErrorAction SilentlyContinue
if ($appPool) {
    Set-ItemProperty "IIS:\AppPools\$SiteName" -Name managedPipelineMode -Value "Integrated"
    Write-Host "   OK: App pool configured" -ForegroundColor Gray
}

Write-Host ""
Write-Host "8. Checking URL Rewrite module..." -ForegroundColor Green
$rewriteModule = Get-WebGlobalModule -Name "RewriteModule" -ErrorAction SilentlyContinue
if ($rewriteModule) {
    Write-Host "   OK: URL Rewrite module installed" -ForegroundColor Gray
} else {
    Write-Host "   WARNING: URL Rewrite module not found" -ForegroundColor Yellow
    Write-Host "   Download from: https://www.iis.net/downloads/microsoft/url-rewrite" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "9. Starting site..." -ForegroundColor Green
Start-Website -Name $SiteName -ErrorAction SilentlyContinue
Write-Host "   OK: Site started" -ForegroundColor Gray

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Access URL:" -ForegroundColor White
if ($HostName -ne "") {
    Write-Host "  http://${HostName}:${Port}/" -ForegroundColor Cyan
} else {
    Write-Host "  http://localhost:${Port}/" -ForegroundColor Cyan
}
Write-Host ""
