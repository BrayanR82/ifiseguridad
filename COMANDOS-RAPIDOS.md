# ⚡ Referencia Rápida - Comandos Comunes

## 🚀 Inicio Rápido

```bash
# Local development
cd ifi-proyecto/backend
cp .env.example .env
pnpm install
pnpm run dev
# http://localhost:3000

# Con Docker
cd ifi-proyecto
docker-compose up
# http://localhost:3000
```

---

## 🔧 Scripts del Proyecto

```bash
# Desarrollo
pnpm run dev              # Servidor con hot-reload
pnpm run devsafe          # Limpiar cache y reiniciar

# Build & Deploy
pnpm run build            # Compilar producción
pnpm run start            # Servir producción

# Tipos & Schemas
pnpm run generate:types   # Generar tipos TypeScript
pnpm run generate:importmap # Generar mapa de importaciones

# Linting & Formateo
pnpm run lint             # Verificar ESLint
pnpm run lint --fix       # Auto-fix linting

# Testing
pnpm run test             # Todos los tests
pnpm run test:int         # Tests unitarios (Vitest)
pnpm run test:e2e         # Tests E2E (Playwright)

# CMS CLI
pnpm run payload          # Acceder CLI de Payload
```

---

## 🐳 Docker Commands

```bash
# Operaciones básicas
docker-compose up         # Iniciar servicios
docker-compose up -d      # Iniciar en background
docker-compose logs -f    # Ver logs en tiempo real
docker-compose down       # Parar servicios
docker-compose down -v    # Parar y borrar volúmenes (⚠️)

# Desarrollo
docker-compose up --build       # Reconstruir imagen
docker-compose up --build --no-cache # Sin cache

# Debugging
docker-compose exec payload-app sh       # Shell en contenedor
docker-compose exec payload-app pnpm run lint # Ejecutar comando
docker-compose exec mongo mongo          # Conectar a MongoDB
```

---

## 📝 Git Comandos Esenciales

```bash
# Setup inicial
git clone https://github.com/ifiseguridad/ifiseguridad.git
cd ifiseguridad
git checkout develop  # O tu rama

# Desarrollo
git checkout -b feature/mi-feature  # Nueva rama
git add .                           # Stage cambios
git commit -m "feat: descripción"   # Commit
git push origin feature/mi-feature  # Push

# Antes de PR
git fetch upstream        # Traer cambios del repo oficial
git rebase upstream/main  # Actualizar con main
git push -f               # Push forzado (después de rebase)

# Después de PR mergiado
git checkout main
git pull upstream main
git branch -d feature/mi-feature  # Borrar rama local
```

---

## 📂 Crear Estructura Nueva

### Nueva Colección
```bash
# 1. Crear archivo
touch src/collections/MyCollection.ts

# 2. Escribir config
# (ver GUIA-DESARROLLO.md para template)

# 3. Registrar en payload.config.ts
# Agregar a array de collections

# 4. Generar tipos
pnpm run generate:types
```

### Nuevo Componente
```bash
# 1. Crear carpeta
mkdir src/components/MyComponent

# 2. Crear archivos
touch src/components/MyComponent/index.tsx
touch src/components/MyComponent/styles.css
touch src/components/MyComponent/__tests__/index.test.tsx

# 3. Escribir código
# (ver GUIA-DESARROLLO.md para template)
```

### Nuevo Test
```bash
# 1. Unitario
touch src/utils/__tests__/myFunction.test.ts

# 2. E2E
touch tests/my-feature.spec.ts

# 3. Escribir test
# (ver GUIA-DESARROLLO.md para templates)
```

---

## 🐛 Solucionar Problemas Comunes

### MongoDB no conecta
```bash
# Verificar URL en .env
echo $MONGODB_URL

# Si usas Docker, verificar nombre del servicio
# en docker-compose.yml debe ser: mongodb://mongo:27017/...

# Reintentar conexión
docker-compose restart mongo
```

### Puerto ya en uso
```bash
# Opción 1: Cambiar puerto en .env
PORT=3001

# Opción 2: En Docker (en docker-compose.yml)
ports:
  - "3001:3000"
```

### Next.js cache corrupto
```bash
# Limpiar cache
rm -rf .next
rm -rf node_modules/.vite

# Reiniciar
pnpm run dev
```

### Permisos en carpeta media (Docker)
```bash
docker-compose exec payload-app chmod -R 775 /home/node/app/media
docker-compose exec payload-app chown -R 1000:1000 /home/node/app/media
```

### TypeScript errors
```bash
# Validar tipado
tsc --noEmit

# Regenerar tipos de Payload
pnpm run generate:types

# Limpiar node_modules
rm -rf node_modules
pnpm install
```

---

## 📊 Verificar Que Todo Funciona

```bash
# 1. Tests pasan
pnpm run test

# 2. Lint sin errores
pnpm run lint

# 3. TypeScript válido
tsc --noEmit

# 4. Build exitoso
pnpm run build

# 5. Dev server funciona
pnpm run dev
# Verificar: http://localhost:3000
```

---

## 🔍 Debugging

### Logs en Terminal
```bash
# Ver logs de contenedor
docker-compose logs -f payload-app

# Con grep
docker-compose logs payload-app | grep error

# MongoDB logs
docker-compose logs mongo
```

### Browser DevTools
```
Ctrl+Shift+I (Windows/Linux)
Cmd+Option+I (Mac)

# Tabs importantes:
- Console: Errores JS
- Network: APIs
- Storage: Cookies/LocalStorage
```

### Node Debugger
```bash
# En package.json, modificar script:
"dev": "node --inspect-brk ./node_modules/.bin/next dev"

# Abrir chrome://inspect
```

---

## 📋 Checklist Antes de Commit

```
□ Código formateado:    pnpm run lint --fix
□ Sin errores TS:       tsc --noEmit
□ Tests pasan:          pnpm run test
□ Mensaje descriptivo:  "feat: descripción"
□ No hay .env en git:   git status
□ Rama correcta:        git branch
□ Cambios relevantes:   git diff
```

---

## 🔐 Seguridad

### Secrets NUNCA deben commitear
```bash
# ✅ Correcto
.env
.env.local
secret.key

# ❌ Mal
MONGODB_URL=mongodb://user:pass@host
PAYLOAD_SECRET=my-secret-123
API_KEY=xyz123abc
```

### Variables en .env
```env
# Plantilla segura
MONGODB_URL=
PAYLOAD_SECRET=
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3000
```

---

## 🚀 Performance

### Analizar Bundle
```bash
# Si está configurado:
pnpm run analyze

# Ver tamaño de archivos
du -h node_modules/
```

### Optimizar Docker
```bash
# Construir sin capas intermedias
docker-compose build --no-cache

# Ver tamaño de imagen
docker images
```

---

## 📞 Help & Docs

```bash
# Payload CLI help
pnpm run payload -h

# Next.js commands
pnpm run --help

# Git help
git help <command>
# Ejemplo: git help commit
```

---

## ✍️ Formatos Útiles

### Commit Message
```
feat(scope): descripción
fix(auth): corregir bug validación
docs(readme): actualizar instrucciones
refactor(api): simplificar código
test(users): agregar tests
```

### Branch Name
```
feature/nueva-funcionalidad
bugfix/nombre-del-bug
refactor/simplificar-algo
docs/mejorar-documentación
```

### PR Title
```
✨ feat: agregar validación de emails
🐛 fix: corregir error de login
📖 docs: actualizar README
♻️ refactor: mejorar performance
✅ test: agregar tests unitarios
```

---

## 🎯 URLs Útiles Cuando Está Corriendo

```
Admin Panel:      http://localhost:3000/admin
API REST:         http://localhost:3000/api
GraphQL Playground: http://localhost:3000/api/graphql
Media:            http://localhost:3000/media
```

---

## 🆘 Emergency Commands

```bash
# Nuclear reset (⚠️ Borra todo)
docker-compose down -v
pnpm install
pnpm run generate:types

# Kill all docker containers
docker ps -a -q | xargs docker rm -f

# Start fresh
git checkout .
git clean -fd
pnpm install
```

---

**Última actualización**: Mayo 2026

*Referencia Rápida - IFI Seguridad*
