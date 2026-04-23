## 📂 Configuración de Almacenamiento y Permisos (Media)

Para que la subida de imágenes funcione correctamente en el servidor Ubuntu, es necesario configurar la persistencia y los permisos de escritura, ya que Docker corre por defecto con un usuario de bajos privilegios.

## 1. Persistencia de Archivos
En el archivo `docker-compose.yml`, vinculamos la carpeta local del servidor con la carpeta interna del contenedor para evitar la pérdida de datos al reiniciar:

```yaml
services:
  payload-app:
    # ...
    volumes:
      - ./media:/home/node/app/media

# Crear la carpeta física si no existe
mkdir -p media
Si da error al añadir la imagen, se añaden permisos
# Cambiar el propietario al usuario de Docker (ID 1000 es el estándar de Node/Alpine)
sudo chown -R 1000:1000 media

# Asignar permisos de lectura y escritura (rwxrwxr-x)
sudo chmod -R 775 backend/media
