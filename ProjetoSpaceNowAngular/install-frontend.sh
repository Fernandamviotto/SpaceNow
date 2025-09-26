echo "🚀 Instalando dependências do Frontend (Angular)..."

node -v || { echo "❌ Node.js não encontrado. Instale o Node.js antes de continuar."; exit 1; }
npm -v || { echo "❌ NPM não encontrado. Instale o NPM antes de continuar."; exit 1; }

npm install

npm install -g @angular/cli

npm install @supabase/supabase-js

echo "✅ Dependências do frontend (Angular + Supabase) instaladas com sucesso!"
