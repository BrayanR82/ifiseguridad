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
      label: 'Nombre del Producto',
    },
    {
      name: 'imagenUrl',
      type: 'text',
      required: false,
      label: 'URL de la Imagen (Link de PostImages)',
    },
    {
      name: 'precio',
      type: 'number', // Campo numérico para el precio
      required: true,
      label: 'Precio ($)',
      admin: {
        placeholder: 'Ej: 50000',
      },
    },
    {
      name: 'stock',
      type: 'number', // Campo numérico para las unidades
      required: false,
      label: 'Unidades Disponibles',
      defaultValue: 0,
    },
    {
      name: 'descripcion',
      type: 'richText', // Para que puedas poner negritas, listas, etc.
      label: 'Descripción Detallada',
    },
  ],
}