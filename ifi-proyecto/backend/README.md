# 🎯 Backend - IFI Seguridad CMS

## 📋 Descripción

Backend de **IFI Seguridad** construido con **Payload CMS v3.78**, **Next.js 15.4**, **MongoDB** y **TypeScript**.

Este módulo proporciona:
- ✅ API REST y GraphQL completa
- ✅ Panel administrativo intuitivo
- ✅ Sistema de autenticación de usuarios
- ✅ Gestión de medios con optimización
- ✅ Testing automático (unitarios y E2E)

---

## 🚀 Inicio Rápido

### Requisitos
- **Node.js**: v18 o superior
- **pnpm**: v8 o superior
- **MongoDB**: v6 o superior

### Instalación (Local)

1. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Generar tipos**
   ```bash
   pnpm run generate:types
   ```

4. **Iniciar desarrollo**
   ```bash
   pnpm run dev
   ```

5. **Acceder a la app**
   - Frontend: http://localhost:3000
   - Admin: http://localhost:3000/admin

---

## 🐳 Instalación con Docker

Desde la carpeta raíz del proyecto (`ifi-proyecto/`):

```bash
docker-compose up
```

La aplicación estará disponible en http://localhost:3000

---

## 📖 Scripts Disponibles

```bash
# Desarrollo
pnpm run dev                    # Servidor de desarrollo
pnpm run devsafe              # Limpiar cache y reiniciar

# Producción
pnpm run build                # Compilar para producción
pnpm run start                # Iniciar servidor

# Generación de código
pnpm run generate:types       # Generar tipos de Payload
pnpm run generate:importmap   # Generar mapa de importaciones

# Calidad
pnpm run lint                 # Ejecutar ESLint

# Testing
pnpm run test               # Ejecutar todos los tests
pnpm run test:int           # Tests unitarios (Vitest)
pnpm run test:e2e           # Tests E2E (Playwright)

# CMS
pnpm run payload            # CLI de Payload
```

---

## 📂 Estructura del Proyecto

```
backend/
├── src/
│   ├── app/                 # Rutas y layouts Next.js
│   ├── collections/         # Definiciones de colecciones
│   │   ├── Media.ts        # Gestión de imágenes
│   │   ├── Users.ts        # Autenticación y usuarios
│   │   └── ...
│   ├── components/          # Componentes React reutilizables
│   ├── graphic/             # Tipos y grafos de datos
│   ├── payload.config.ts    # ⚙️ Configuración principal
│   └── globals.css          # Estilos globales
├── public/                  # Archivos estáticos
├── media/                   # Almacenamiento de imágenes
├── tests/                   # Pruebas unitarias
├── .env.example             # Variables de entorno
├── package.json             # Dependencias
├── tsconfig.json            # Configuración TypeScript
├── next.config.mjs          # Configuración Next.js
├── vitest.config.mts        # Testing unitarios
└── playwright.config.ts     # Testing E2E
```

---

## 🔧 Configuración

### Variables de Entorno (`.env`)

```env
# Base de datos
MONGODB_URL=mongodb://localhost:27017/ifi-seguridad

# Seguridad
PAYLOAD_SECRET=tu_secret_aqui

# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Puerto (opcional)
PORT=3000
```

Ver `.env.example` para opciones adicionales.

---

## 📚 Colecciones

### Users
- Sistema de autenticación integrado
- Acceso al panel administrativo
- Gestión de roles y permisos

### Media
- Upload de imágenes
- Redimensionamiento automático
- Almacenamiento persistente
- Optimización con Sharp

---

## 🧪 Testing

### Tests Unitarios
```bash
pnpm run test:int
```
Configurados con **Vitest** en `vitest.config.mts`

### Tests E2E
```bash
pnpm run test:e2e
```
Configurados con **Playwright** en `playwright.config.ts`

---

## 📡 API

### REST API
```bash
GET    /api/your-collection
POST   /api/your-collection
GET    /api/your-collection/:id
PATCH  /api/your-collection/:id
DELETE /api/your-collection/:id
```

### GraphQL API
```
POST http://localhost:3000/api/graphql
```

Acceder a GraphQL Playground en modo desarrollo.

---

## 🔐 Almacenamiento de Medios

Para configurar permisos correctly en Docker/Linux:

```bash
# Crear carpeta
mkdir -p media

# Asignar permisos
sudo chown -R 1000:1000 media
sudo chmod -R 775 media
```

En `docker-compose.yml`:
```yaml
volumes:
  - ./backend/media:/home/node/app/media
```

---

## 🎨 Tipado TypeScript

El proyecto usa TypeScript para máxima seguridad de tipos. Genera tipos de Payload:

```bash
pnpm run generate:types
```

---

## 📦 Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|----------|
| payload | 3.78.0 | CMS headless |
| next | 15.4 | Framework React |
| mongoose | - | Driver MongoDB |
| typescript | 5.7 | Tipado estático |
| vitest | 4.0 | Testing unitario |
| @playwright/test | 1.58 | Testing E2E |

---

## 🚀 Deploy

### Payload Cloud
1. Pushear cambios a GitHub
2. Conectar repo en Payload Cloud
3. Deploy automático

### Servidor propio
```bash
# Build
pnpm run build

# Deploy con Docker
docker build -t ifi-seguridad:latest .
docker run -p 3000:3000 ifi-seguridad:latest
```

---

## 🐛 Troubleshooting

### MongoDB no funciona
```bash
# Verificar conexión
# Editar .env con URL correcta
MONGODB_URL=mongodb://localhost:27017/ifi-seguridad
```

### Puerto 3000 en uso
```bash
# Editar .env
PORT=3001
```

### Limpiar cache
```bash
rm -rf .next node_modules/.vite
pnpm run dev
```

### Permisos de media en Docker
```bash
docker-compose exec payload-app chmod -R 775 /home/node/app/media
```

---

## 📚 Documentación

- **Payload Docs**: https://payloadcms.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB**: https://docs.mongodb.com/
- **TypeScript**: https://www.typescriptlang.org/docs

---

## 📝 Notas de Desarrollo

- Los cambios en `src/` se reflejan automáticamente en modo desarrollo
- Regenerar tipos después de cambios en colecciones: `pnpm run generate:types`
- Usar `pnpm` en lugar de `npm` para consistencia
- Seguir la estructura de carpetas existente
- Mantener tests actualizados con nuevas funcionalidades

---

**Proyecto Final de SMR** © 2026 Félix Carretero García & Brayan Valencia Rivera
