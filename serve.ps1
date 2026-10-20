$port = 8080
Write-Host "God Med running at http://localhost:$port  (Ctrl+C to stop)"
Set-Location $PSScriptRoot
python -m http.server $port
