import { CollectionConfig } from 'payload'

export const Productos: CollectionConfig = {
  slug: 'productos',
  // Configuramos el acceso de lectura para que sea público
  access: {
    read: () => true,
  },
  // Configuración de la interfaz del administrador
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'precio', 'stock'],
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    // ... otros campos (precio, descripción) ...
    {
      name: 'imagenUrl', // Cambiamos el nombre para que sea claro
      type: 'text',
      label: 'URL de la Imagen (Link de internet)',
      required: false, // Ponlo en true si quieres que siempre tenga foto
    },
  ],
}