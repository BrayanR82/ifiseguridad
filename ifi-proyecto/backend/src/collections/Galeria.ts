import { CollectionConfig } from 'payload'

export const Galeria: CollectionConfig = {
  slug: 'galeria',
  // Configuramos el acceso de lectura para que sea público
  access: {
    read: () => true,
  },
  // Configuración de la interfaz del administrador
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'imagen'],
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Título de la Imagen',
    },
    {
      name: 'imagen',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      label: 'Imagen',
    },
    {
      name: 'descripcion',
      type: 'textarea',
      required: false,
      label: 'Descripción (Opcional)',
    },
    {
      name: 'orden',
      type: 'number',
      required: false,
      label: 'Orden de Aparición',
      defaultValue: 0,
      admin: {
        placeholder: 'Números menores aparecen primero',
      },
    },
  ],
}