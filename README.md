# 🔐 IFI Seguridad - Sistema de Gestión de Contenidos

## 📋 Descripción del Proyecto

**IFI Seguridad** es un sistema de gestión de contenidos (CMS) desarrollado como **Proyecto Final del Curso de Sistemas Microinformáticos en Red (SMR)**.

Este proyecto implementa una solución completa de backend basada en **Payload CMS** con Next.js, MongoDB y Docker, proporcionando una plataforma escalable y segura para la gestión de contenidos, usuarios y medios.

### 👥 Autores
- **Félix Carretero García**
- **Brayan Valencia Rivera**

---

## 🎯 Características Principales

- ✅ **CMS Moderno**: Payload CMS v3.78 con interfaz administrativa intuitiva
- ✅ **Autenticación**: Sistema de usuarios con roles y permisos
- ✅ **Gestión de Medios**: Upload de imágenes con optimización automática
- ✅ **API GraphQL y REST**: Acceso flexible a los datos
- ✅ **Containerización**: Completamente dockerizado para facilitar despliegue
- ✅ **Desarrollo Local**: Soporte para MongoDB local o en contenedor
- ✅ **Testing**: Suite de tests unitarios y e2e con Vitest y Playwright
- ✅ **TypeScript**: Tipado completo para mayor seguridad

---

## 🛠️ Stack Tecnológico

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js 15.4
- **CMS**: Payload CMS 3.78
- **Base de Datos**: MongoDB
- **Lenguaje**: TypeScript
- **API**: GraphQL + REST

### DevOps
- **Containerización**: Docker & Docker Compose
- **Orquestación**: Docker Compose

### Testing & Calidad
- **Testing Unitario**: Vitest
- **Testing E2E**: Playwright
- **Linting**: ESLint
- **Formateo**: Prettier

---

## 📦 Requisitos Previos

### Opción 1: Local (Sin Docker)
- **Node.js**: v18 o superior
- **pnpm**: v8 o superior
- **MongoDB**: v6 o superior (servidor local o remoto)

### Opción 2: Con Docker
- **Docker**: v20.10 o superior
- **Docker Compose**: v2.0 o superior

---

## 🚀 Instalación y Configuración

### Opción 1: Desarrollo Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/ifiseguridad/ifiseguridad.git
   cd ifiseguridad/ifi-proyecto/backend
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env` y añadir tu `MONGODB_URL`:
   ```env
   MONGODB_URL=mongodb://localhost:27017/ifi-seguridad
   ```

3. **Instalar dependencias**
   ```bash
   pnpm install
   ```

4. **Generar tipos de Payload**
   ```bash
   pnpm run generate:types
   ```

5. **Iniciar servidor de desarrollo**
   ```bash
   pnpm run dev
   ```

6. **Acceder a la aplicación**
   - Frontend: http://localhost:3000
   - Panel de Administración: http://localhost:3000/admin

---

### Opción 2: Con Docker (Recomendado)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/ifiseguridad/ifiseguridad.git
   cd ifiseguridad/ifi-proyecto
   ```

2. **Crear archivo `.env`** (en `backend/` si no existe)
   ```bash
   cp backend/.env.example backend/.env
   ```

3. **Iniciar con Docker Compose**
   ```bash
   docker-compose up
   ```
   
   O en modo background:
   ```bash
   docker-compose up -d
   ```

4. **Acceder a la aplicación**
   - Frontend: http://localhost:3000
   - Panel de Administración: http://localhost:3000/admin

---

## 📝 Configuración de Almacenamiento y Permisos (Media)

Para que la subida de imágenes funcione correctamente en servidor Ubuntu dentro de contenedores Docker, es necesario configurar la persistencia y los permisos de escritura:

### 1. Persistencia de Archivos

En el archivo `docker-compose.yml`, la carpeta local se vincula con el contenedor:

```yaml
services:
  payload-app:
    # ...
    volumes:
      - ./backend/media:/home/node/app/media
```

### 2. Crear la carpeta de medios

```bash
mkdir -p backend/media
```

### 3. Asignar permisos correctos

```bash
# Cambiar el propietario (1000 es el UID estándar de Node)
sudo chown -R 1000:1000 backend/media

# Asignar permisos de lectura y escritura
sudo chmod -R 775 backend/media
```

---

## 📂 Estructura del Proyecto

```
ifiseguridad/
├── ifi-proyecto/
│   ├── backend/                    # Aplicación Next.js + Payload CMS
│   │   ├── src/
│   │   │   ├── app/               # Rutas y layouts de Next.js
│   │   │   ├── collections/       # Definiciones de colecciones
│   │   │   ├── components/        # Componentes React
│   │   │   ├── graphic/           # Grafos de tipos
│   │   │   └── payload.config.ts  # Configuración de Payload
│   │   ├── public/                # Archivos estáticos
│   │   ├── media/                 # Almacenamiento de imágenes
│   │   ├── tests/                 # Pruebas del proyecto
│   │   ├── package.json           # Dependencias
│   │   ├── next.config.mjs        # Configuración Next.js
│   │   └── README.md              # Documentación del backend
│   ├── Dockerfile                 # Imagen Docker
│   ├── docker-compose.yml         # Orquestación de servicios
│   └── .dockerignore             # Archivos ignorados en Docker
└── README.md                       # Este archivo
```

---

## 🔧 Scripts Disponibles

### Desarrollo
```bash
pnpm run dev          # Iniciar servidor de desarrollo
pnpm run devsafe      # Limpiar cache y reiniciar servidor
```

### Producción
```bash
pnpm run build        # Compilar para producción
pnpm run start        # Iniciar servidor en producción
```

### Generación de código
```bash
pnpm run generate:types      # Generar tipos de Payload
pnpm run generate:importmap  # Generar mapa de importaciones
```

### Calidad de código
```bash
pnpm run lint        # Ejecutar ESLint
```

### Testing
```bash
pnpm run test        # Ejecutar todos los tests
pnpm run test:int    # Ejecutar tests unitarios (Vitest)
pnpm run test:e2e    # Ejecutar tests E2E (Playwright)
```

### CMS
```bash
pnpm run payload     # CLI de Payload CMS
```

---

## 🧪 Testing

El proyecto incluye dos tipos de testing:

### Tests Unitarios (Vitest)
```bash
pnpm run test:int
```
Ubicados en `backend/tests/`

### Tests E2E (Playwright)
```bash
pnpm run test:e2e
```
Configurados en `playwright.config.ts`

---

## 🐳 Operaciones con Docker

### Iniciar servicios
```bash
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f payload-app
```

### Detener servicios
```bash
docker-compose down
```

### Reconstruir imagen
```bash
docker-compose up --build
```

### Eliminar volúmenes (⚠️ Elimina datos)
```bash
docker-compose down -v
```

---

## 📚 Colecciones del CMS

El proyecto incluye las siguientes colecciones:

### Users (Usuarios)
- Autenticación y autorización
- Acceso al panel de administración
- Gestión de roles y permisos

### Media (Medios)
- Gestión de imágenes
- Optimización automática
- Almacenamiento persistente

Consulta `src/collections/` para ver las definiciones completas.

---

## 🔐 Seguridad

- Variables de entorno protegidas en `.env`
- Autenticación de usuarios integrada
- Control de acceso basado en roles
- Validación de entrada en todas las operaciones

---

## 🚨 Troubleshooting

### Error de permisos en media
```bash
# Solución
sudo chown -R 1000:1000 backend/media
sudo chmod -R 775 backend/media
```

### MongoDB no se conecta
- Verificar que MongoDB está corriendo
- Confirmar `MONGODB_URL` en `.env`
- Comprobar credenciales y puerto

### Puerto 3000 ya en uso
```bash
# Cambiar puerto en .env
PORT=3001
```

### Limpiar cache de Next.js
```bash
rm -rf .next && pnpm run dev
```

---

## 📖 Documentación Adicional

- **Backend**: Ver [backend/README.md](ifi-proyecto/backend/README.md)
- **Payload CMS**: https://payloadcms.com/docs
- **Next.js**: https://nextjs.org/docs
- **MongoDB**: https://docs.mongodb.com/

---

## 📄 Licencia

Félix Carretero García & Brayan Valencia Rivera

---

## 💬 Soporte

Para reportar issues o sugerencias, abre un [GitHub Issue](https://github.com/ifiseguridad/ifiseguridad/issues).

---

**Última actualización**: Mayo 2026
