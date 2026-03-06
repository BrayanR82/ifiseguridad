# Usamos Node 20 (versión específica para forzar el cambio)
FROM node:20.18-alpine

WORKDIR /home/node/app/backend

# Copiamos package.json
COPY backend/package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . /home/node/app/

# Variables para que Next.js no intente conectar a bases de datos reales durante el build
ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_CONFIG_PATH=src/payload.config.ts
ENV NODE_ENV=production

# Ejecutamos el build
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]