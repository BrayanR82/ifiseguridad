import type { CollectionConfig } from 'payload'

export const Servicios: CollectionConfig = {
  slug: 'servicios',
  admin: {
    useAsTitle: 'titulo',
  },
  // CAMBIA ESTO:
  access: {
    read: () => true,   // Cualquiera puede verlos
    create: () => true, // Permite crear (esto quita el error que tienes)
    update: () => true, // Permite editar
    delete: () => true, // Permite borrar
  },
fields: [
    {
      name: 'titulo',
      type: 'text',
    },
    {
      name: 'fotoServicio',
      type: 'text',
      label: 'Enlace de la foto del servicio',
    },
  ],
}