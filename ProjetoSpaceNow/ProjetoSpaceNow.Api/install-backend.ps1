Write-Host "🚀 Instalando dependências do Backend (.NET C#)..."

dotnet --version
if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ .NET SDK não encontrado. Instale o .NET SDK antes de continuar."
    exit 1
}

dotnet restore

dotnet add package Supabase
dotnet add package Supabase.Realtime
dotnet add package Supabase.Storage

Write-Host "✅ Dependências do backend (.NET + Supabase) instaladas com sucesso!"
