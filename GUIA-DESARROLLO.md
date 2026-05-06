# 📖 Guía de Desarrollo - IFI Seguridad

## 🎓 Proyecto Final de SMR

**Autores**: Félix Carretero García & Brayan Valencia Rivera

Esta guía proporciona instrucciones completas para contribuir y desarrollar **IFI Seguridad**.

---

## 📋 Requisitos del Sistema

### Desarrollo Local
- **Node.js**: v18 o superior
- **pnpm**: v8 o superior (gestor de paquetes recomendado)
- **MongoDB**: v6 o superior
- **Git**: v2.0 o superior
- **Visual Studio Code** (recomendado)

### Desarrollo con Docker
- **Docker**: v20.10 o superior
- **Docker Compose**: v2.0 o superior

---

## 🏗️ Arquitectura del Proyecto

```
ifiseguridad/
├── ifi-proyecto/
│   ├── backend/                    # Aplicación Next.js + Payload CMS
│   │   ├── src/
│   │   │   ├── app/               # Next.js routes y layouts
│   │   │   ├── collections/       # Payload collections (Users, Media, etc)
│   │   │   ├── components/        # Componentes React reutilizables
│   │   │   ├── globals/           # Configuraciones globales
│   │   │   ├── hooks/             # React hooks personalizados
│   │   │   ├── access/            # Control de acceso
│   │   │   ├── graphic/           # Tipos GraphQL generados
│   │   │   ├── payload.config.ts  # Configuración principal de Payload
│   │   │   └── globals.css        # Estilos globales
│   │   ├── tests/                 # Tests unitarios
│   │   ├── public/                # Archivos estáticos
│   │   ├── media/                 # Almacenamiento de imágenes
│   │   ├── package.json
│   │   ├── tsconfig.json          # Configuración TypeScript
│   │   ├── next.config.mjs        # Configuración Next.js
│   │   ├── vitest.config.mts      # Testing unitarios
│   │   ├── playwright.config.ts   # Testing E2E
│   │   └── .env.example
│   ├── Dockerfile                 # Imagen Docker
│   ├── docker-compose.yml         # Orquestación
│   └── .dockerignore
├── .gitignore
└── README.md
```

---

## 🚀 Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone https://github.com/ifiseguridad/ifiseguridad.git
cd ifiseguridad/ifi-proyecto/backend
```

### 2. Instalación con pnpm

```bash
# Instalar dependencias
pnpm install

# Generar tipos de Payload
pnpm run generate:types

# Empezar desarrollo
pnpm run dev
```

### 3. Instalación con Docker

```bash
cd ..  # Volver a ifi-proyecto/
docker-compose up
```

---

## 📚 Convenciones de Código

### TypeScript
- **Siempre usar TypeScript** con tipos explícitos
- Ejecutar `tsc --noEmit` para validar antes de commit
- Usar tipos de Payload: `import { CollectionConfig } from 'payload'`

### Estructura de Carpetas
```
src/
├── [feature-name]/
│   ├── component.tsx
│   ├── types.ts
│   ├── utils.ts
│   └── component.test.ts (si aplica testing)
```

### Nomenclatura
- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Funciones**: camelCase (`getUserData()`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Carpetas**: kebab-case (`user-profile`, `media-handler`)

### Formateo de Código
- Usar **Prettier** para formateo automático
- ESLint para calidad de código
- Ejecutar antes de commit:
  ```bash
  pnpm run lint
  ```

---

## 🔧 Workflow de Desarrollo

### Crear una Nueva Colección

1. Crear archivo en `src/collections/MyCollection.ts`:

```typescript
import { CollectionConfig } from 'payload'

export const MyCollection: CollectionConfig = {
  slug: 'my-collection',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
```

2. Registrar en `src/payload.config.ts`:

```typescript
{
  collections: [
    Users,
    Media,
    MyCollection,  // Añadir aquí
  ]
}
```

3. Regenerar tipos:

```bash
pnpm run generate:types
```

### Componentes Personalizados

1. Crear en `src/components/MyComponent.tsx`:

```typescript
import React from 'react'

interface MyComponentProps {
  title: string
  children: React.ReactNode
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  children,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

2. Exportar desde `src/components/index.ts` si es reutilizable

### Control de Acceso

En `src/access/isAdmin.ts`:

```typescript
import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin')
}
```

---

## 🧪 Testing

### Tests Unitarios (Vitest)

```bash
# Ejecutar tests
pnpm run test:int

# Modo watch
pnpm run test:int -- --watch
```

Crear test en `src/utils/__tests__/myFunction.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '../myFunction'

describe('myFunction', () => {
  it('should return true', () => {
    expect(myFunction()).toBe(true)
  })
})
```

### Tests E2E (Playwright)

```bash
# Ejecutar tests
pnpm run test:e2e

# Modo ui interactivo
npx playwright test --ui
```

Crear test en `backend/tests/admin.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test('should login to admin', async ({ page }) => {
  await page.goto('http://localhost:3000/admin')
  await page.fill('[name="email"]', 'admin@example.com')
  await page.fill('[name="password"]', 'password')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/.*admin/)
})
```

---

## 🐳 Operaciones con Docker

### Inicio y Parada

```bash
# Iniciar en background
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f payload-app

# Parar servicios
docker-compose down

# Parar y eliminar volúmenes (⚠️ Borra datos)
docker-compose down -v
```

### Debugging en Contenedor

```bash
# Ejecutar comando en contenedor
docker-compose exec payload-app pnpm run lint

# Acceder a shell
docker-compose exec payload-app sh

# Ver ejecución en tiempo real
docker-compose exec payload-app npm run dev
```

### Reconstruir Imagen

```bash
# Rebuild sin cache
docker-compose up --build --no-cache
```

---

## 🔐 Variables de Entorno

### Plantilla `.env`

```env
# Base de datos
MONGODB_URL=mongodb://localhost:27017/ifi-seguridad

# Seguridad (generar con: openssl rand -base64 32)
PAYLOAD_SECRET=tu_secret_seguro_aqui

# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Puerto
PORT=3000

# Cloudinary (opcional para almacenamiento externo)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Nunca commitear `.env` al repositorio**.

---

## 📤 Git Workflow

### Ramas

- **main**: Código de producción (protegida)
- **develop**: Rama de integración
- **feature/...**: Nuevas funcionalidades
- **bugfix/...**: Correcciones

### Commits

```bash
# Crear rama de feature
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commits
git add .
git commit -m "feat: añadir nueva funcionalidad descriptiva"

# Push y crear PR
git push origin feature/nueva-funcionalidad
```

**Formato de commits (Conventional Commits)**:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Formateo (sin cambios lógicos)
- `refactor:` Refactorización
- `test:` Tests
- `chore:` Cambios de configuración

---

## 📊 Scripts útiles

```bash
# Desarrollo
pnpm run dev           # Servidor de desarrollo
pnpm run devsafe      # Limpiar y reiniciar (si hay problemas)

# Producción
pnpm run build        # Build para producción
pnpm run start        # Iniciar producción

# Tipos y schemas
pnpm run generate:types       # Generar tipos
pnpm run generate:importmap   # Generar importmap

# Calidad
pnpm run lint         # ESLint
pnpm run lint --fix   # Auto-fix linting

# Testing
pnpm run test         # Todos los tests
pnpm run test:int     # Unitarios
pnpm run test:e2e     # E2E

# Payload CLI
pnpm run payload      # Acceder a CLI
pnpm run payload -h   # Ver comandos disponibles
```

---

## 🐛 Troubleshooting Común

### Error: MongoDB não se conecta
```
Solução:
1. Verificar MONGODB_URL en .env
2. Asegurar que MongoDB está corriendo
3. Comprobar firewall/permisos de red
```

### Error: "Port 3000 already in use"
```bash
# Cambiar puerto en .env
PORT=3001
```

### Error: TypeScript compilation failed
```bash
# Validar TypeScript
tsc --noEmit

# Regenerar tipos
pnpm run generate:types
```

### Error: Permisos en Docker `media/`
```bash
docker-compose exec payload-app chmod -R 775 /home/node/app/media
```

### Next.js cache corrupto
```bash
rm -rf .next
pnpm run dev
```

---

## 🚀 Deploy

### Payload Cloud (Recomendado)
1. Crear cuenta en https://payloadcms.com
2. Conectar repositorio
3. Configure variables de entorno
4. Deploy automático en cada push a `main`

### Docker Compose en Server
```bash
# Clonar repo
git clone https://github.com/ifiseguridad/ifiseguridad.git
cd ifiseguridad/ifi-proyecto

# Crear .env en backend/
cp backend/.env.example backend/.env
# Editar .env con valores de producción

# Deploy
docker-compose up -d
```

---

## 📚 Recursos Útiles

- **Payload Docs**: https://payloadcms.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB**: https://docs.mongodb.com/
- **TypeScript**: https://www.typescriptlang.org/
- **Vitest**: https://vitest.dev/
- **Playwright**: https://playwright.dev/

---

## ✅ Checklist Antes de Hacer Commit

- [ ] Código formateado: `pnpm run lint --fix`
- [ ] Tipos validados: `tsc --noEmit`
- [ ] Tests pasan: `pnpm run test`
- [ ] Mensaje de commit descriptivo
- [ ] No hay secrets en el código (`.env` ignorado)
- [ ] Se regeneraron tipos si hay cambios de schema
- [ ] Se actualizó documentación si aplica

---

## 💬 Soporte y Contacto

- **Issues**: https://github.com/ifiseguridad/ifiseguridad/issues
- **Discussions**: https://github.com/ifiseguridad/ifiseguridad/discussions

---

**Última actualización**: Mayo 2026

*Guía creada para el Curso de Sistemas Microinformáticos en Red (SMR)*
