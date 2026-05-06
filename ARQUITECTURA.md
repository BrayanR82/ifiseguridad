# 🏛️ Arquitectura Técnica - IFI Seguridad

## 📋 Descripción General

**IFI Seguridad** es un Sistema de Gestión de Contenidos (CMS) headless moderno construido con tecnología de punta. Proporciona una separación clara entre backend (API) y frontend, permitiendo máxima flexibilidad.

---

## 🎯 Objetivos Técnicos

1. ✅ **Escalabilidad**: Arquitectura preparada para crecimiento
2. ✅ **Seguridad**: Autenticación, autorización y validación robustas
3. ✅ **Mantenibilidad**: Código limpio y bien estructurado
4. ✅ **Testabilidad**: Testing automático integrado
5. ✅ **Documentación**: APIs bien documentadas
6. ✅ **DevOps**: Containerización completa con Docker

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 15.4
- **UI**: React 19.2
- **Renderizado**: SSR / SSG / ISR

### Backend
- **CMS**: Payload CMS 3.78
- **Runtime**: Node.js + Next.js
- **Lenguaje**: TypeScript 5.7
- **APIs**: REST + GraphQL

### Persistencia
- **Base de Datos**: MongoDB 6+
- **Driver**: Mongoose (integrado en Payload)
- **Almacenamiento**: Sistema de archivos local + Cloudinary (opcional)

### Infraestructura
- **Containerización**: Docker + Docker Compose
- **Orquestación**: Docker Compose (local), Kubernetes (escalado)

### DevOps & Testing
- **Testing Unitario**: Vitest 4.0
- **Testing E2E**: Playwright 1.58
- **Linting**: ESLint + Prettier
- **Build Tool**: Next.js built-in bundler

---

## 📂 Estructura de Carpetas

```
backend/
├── src/
│   ├── app/                       # Rutas Next.js (App Router)
│   │   ├── (payload)/             # Rutas administrativas
│   │   │   ├── admin/
│   │   │   └── api/payload/[...slug]/
│   │   ├── (frontend)/            # Rutas públicas (si aplica)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── collections/               # Definiciones de colecciones
│   │   ├── Users.ts              # Colección de usuarios (auth-enabled)
│   │   ├── Media.ts              # Colección de medios (uploads)
│   │   └── [OtherCollections].ts # Otras colecciones
│   │
│   ├── globals/                   # Configuraciones globales
│   │   └── Settings.ts           # Configuración global
│   │
│   ├── components/                # Componentes React reutilizables
│   │   ├── AdminPanel/
│   │   ├── Forms/
│   │   └── UI/
│   │
│   ├── hooks/                     # React hooks personalizados
│   │   ├── useAuth.ts
│   │   └── useApi.ts
│   │
│   ├── access/                    # Control de acceso (ACL)
│   │   ├── isAdmin.ts
│   │   ├── isUser.ts
│   │   └── canModerate.ts
│   │
│   ├── graphic/                   # Tipos generados automáticamente
│   │   └── types.ts              # Tipos TypeScript de Payload
│   │
│   ├── utils/                     # Funciones utilitarias
│   │   ├── helpers.ts
│   │   └── validators.ts
│   │
│   ├── payload.config.ts          # ⚙️ Configuración principal
│   └── globals.css                # Estilos globales
│
├── public/                        # Archivos estáticos
├── media/                         # Almacenamiento local de imágenes
├── tests/                         # Tests unitarios
├── .env.example                   # Plantilla de variables
├── package.json
├── tsconfig.json
├── next.config.mjs
├── vitest.config.mts
└── playwright.config.ts
```

---

## 🔄 Flujo de Datos

```
┌─────────────────┐
│   Cliente Web   │
└────────┬────────┘
         │
    HTTP/REST
    GraphQL
         │
         ▼
┌─────────────────┐
│  Next.js API    │
│  Endpoints      │
└────────┬────────┘
         │
    Payload CMS
    Business Logic
         │
         ▼
┌─────────────────┐
│   MongoDB       │
│   Database      │
└─────────────────┘

         ▲
         │
    File System
         │
┌─────────────────┐
│   Media/Images  │
└─────────────────┘
```

---

## 🔐 Modelo de Seguridad

### Autenticación
```
Usuario
  │
  ├─ Email + Password (criptografía)
  │
  ▼
JWT Token
  │
  ├─ Usuario
  ├─ Rol
  ├─ Permisos
  │
  ▼
Sesión Autenticada
```

### Autorización (ACL)
```
Usuario
  │
  ├─ admin       → Acceso total
  ├─ editor      → CRUD de contenido
  ├─ viewer      → Solo lectura
  │
  ▼
Control de Acceso por Recurso
```

### Validación
- En cliente (Frontend)
- En servidor (API) ← Siempre confiar en esta
- En base de datos (Schema validation)

---

## 🏗️ Componentes Principales

### 1. Payload CMS

**Responsabilidad**: Gestión de contenidos, autenticación, panel admin

```TypeScript
export default buildConfig({
  // Base de datos
  db: mongooseAdapter({ url: process.env.MONGODB_URL }),
  
  // Admin
  admin: { user: 'users' },
  
  // Collections
  collections: [Users, Media, ...],
  
  // Configuración
  secret: process.env.PAYLOAD_SECRET,
})
```

### 2. Colecciones

**Users (Autenticación)**
```ts
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,  // Habilita autenticación
  fields: [
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'role', type: 'select', options: ['admin', 'editor', 'viewer'] },
  ]
}
```

**Media (Almacenamiento)**
```ts
export const Media: CollectionConfig = {
  slug: 'media',
  upload: { staticURL: '/media', staticDir: './media' },
  fields: [
    { name: 'alt', type: 'text' },
    { name: 'filename', type: 'text' }
  ]
}
```

### 3. APIs

#### REST API
```
GET    /api/users              → Listar (con filtros)
POST   /api/users              → Crear
GET    /api/users/:id          → Obtener uno
PATCH  /api/users/:id          → Actualizar
DELETE /api/users/:id          → Eliminar
```

#### GraphQL API
```graphql
query {
  Users(limit: 10) {
    docs {
      id
      email
      role
    }
  }
}

mutation {
  createUser(data: {...}) {
    id
    email
  }
}
```

---

## 🗄️ Modelo de Datos

### Schema de Usuarios
```ts
{
  _id: ObjectId,
  email: string (unique),
  password: string (bcrypt),
  name: string,
  role: enum ['admin', 'editor', 'viewer'],
  createdAt: Date,
  updatedAt: Date
}
```

### Schema de Medios
```ts
{
  _id: ObjectId,
  filename: string,
  alt: string,
  url: string,
  size: number,
  mimeType: string,
  width?: number,
  height?: number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 Ciclo de Vida de una Solicitud

```
1️⃣ Cliente envía solicitud
   GET /api/users

2️⃣ Next.js route handler recibe
   src/app/(payload)/api/[...].ts

3️⃣ Payload middleware intercepta
   - Valida JWT
   - Verifica rol/permisos

4️⃣ Access control evalúa
   - ¿Usuario tiene permisos?

5️⃣ Handler procesa
   - Construye query MongoDB
   - Aplica filtros

6️⃣ Mongoose ejecuta
   - Conecta a MongoDB
   - Retorna documentos

7️⃣ Payload transforma
   - Aplica hooks
   - Valida output

8️⃣ Respuesta al cliente
   JSON { data: [...], status: 200 }
```

---

## 🧪 Estrategia de Testing

### Niveles de Testing

```
┌─────────────────────────────────┐
│     E2E Testing (Playwright)    │
│  - Flujos completos de usuario  │
│  - Interacción real             │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│   Integration Testing (Vitest)  │
│  - APIs con BD real             │
│  - Hooks y lógica               │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│    Unit Testing (Vitest)        │
│  - Funciones aisladas           │
│  - Utilidades                   │
└─────────────────────────────────┘
```

### Cobertura Esperada
- **Unit**: 80%+
- **Integration**: 70%+
- **E2E**: Flujos críticos

---

## 🐳 Arquitectura Docker

```yaml
services:
  payload-app:
    ├─ Next.js app (puerto 3000)
    ├─ Payload CMS
    └─ Node.js runtime
  
  mongo:
    ├─ MongoDB (puerto 27017)
    └─ Datos persistentes en volumen
```

**Volúmenes**:
```yaml
- backend/media:/home/node/app/media (persistencia de archivos)
- mongo-data:/data/db (persistencia de BD)
```

---

## 🚀 Patrones de Diseño

### 1. Repository Pattern
```ts
// Abstrae la persistencia
class UserRepository {
  async findById(id: string): Promise<User>
  async create(data: UserInput): Promise<User>
  async update(id: string, data: Partial<User>): Promise<User>
}
```

### 2. Service Layer
```ts
// Contiene la lógica de negocio
class AuthService {
  async login(email: string, password: string): Promise<Token>
  async validateToken(token: string): Promise<User>
}
```

### 3. Factory Pattern
```ts
// Crea instancias de servicios
class ServiceFactory {
  static createUserService(): UserService { ... }
}
```

---

## 📊 Rutas Críticas

### Autenticación
```
Login
  ├─ POST /api/users/login
  ├─ Validar credenciales
  ├─ Generar JWT
  └─ Retornar token

Verificación
  ├─ GET /api/users/me
  ├─ Validar JWT
  └─ Retornar usuario autenticado
```

### CRUD de Recursos
```
Create
  ├─ POST /api/collection
  ├─ Validate Data
  ├─ Check Access
  ├─ Insert MongoDB
  └─ Return created resource

Read
  ├─ GET /api/collection/:id
  ├─ Check Access
  ├─ Query MongoDB
  └─ Return resource

Update
  ├─ PATCH /api/collection/:id
  ├─ Validate Data
  ├─ Check Access
  ├─ Update MongoDB
  └─ Return updated resource

Delete
  ├─ DELETE /api/collection/:id
  ├─ Check Access
  ├─ Delete from MongoDB
  └─ Return success
```

---

## 🔧 Extensibilidad

### Agregar Nueva Colección
1. Crear archivo en `src/collections/`
2. Registrar en `payload.config.ts`
3. Correr `pnpm run generate:types`

### Agregar Nuevo Hook
1. Crear archivo en `src/hooks/`
2. Exportar desde hook
3. Usar en componentes

### Agregar Control de Acceso
1. Crear función en `src/access/`
2. Usar en colecciones/endpoints
3. Exportar para reutilización

---

## 🎯 Métricas de Desempeño

### Objetivos
- Time to First Byte: < 200ms
- Core Web Vitals: Green
- API Response Time: < 500ms
- Database Query Time: < 100ms

### Monitoreo
```bash
# Verificar performance
pnpm run lighthouse  # (si está configurado)

# Análisis de bundle
pnpm run analyze
```

---

## 🔒 Consideraciones de Seguridad

1. **CORS**: Configurado en Next.js
2. **CSRF**: Protección automática de Payload
3. **SQL/NoSQL Injection**: Mongoose schema validation
4. **XSS**: React escaping automático
5. **Secrets**: Variables de ambiente
6. **Rate Limiting**: Implementable con middleware
7. **HTTPS**: En producción siempre

---

## 🚨 Casos de Uso Críticos

### Caso 1: Upload de Archivo
```
Form Submit
  ├─ Validar tipo/tamaño en cliente
  ├─ Enviar a /api/media (POST)
  ├─ Validar en servidor
  ├─ Guardar en disk
  ├─ Guardar metadata en MongoDB
  └─ Retornar URL pública
```

### Caso 2: Cambio de Contraseña
```
Usuario solicita cambio
  ├─ Validar contraseña actual
  ├─ Hash nueva contraseña
  ├─ Actualizar en MongoDB
  ├─ Invalidar tokens antiguos
  └─ Requerir reautenticación
```

---

## 📈 Plan de Escalabilidad

### Fase 1: Actual
- Monolito Next.js + Payload
- MongoDB single instance
- Docker Compose local

### Fase 2: Escalado
- Microservicios separados
- MongoDB Replica Set
- Redis para caché
- CDN para static assets

### Fase 3: Enterprise
- Kubernetes orchestration
- Database sharding
- Message queues (RabbitMQ)
- Logging centralizado (ELK)

---

## 🎓 Recursos de Aprendizaje

- **Next.js Architecture**: https://nextjs.org/docs/app
- **Payload CMS Internals**: https://payloadcms.com/docs/architecture
- **MongoDB Performance**: https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/
- **TypeScript Best Practices**: https://www.typescriptlang.org/docs/handbook/

---

**Última actualización**: Mayo 2026

*Documentación de Arquitectura - Proyecto Final SMR*
