import { CollectionConfig, CollectionAfterChangeHook } from 'payload'

const avisarPorConsola: CollectionAfterChangeHook = ({ doc, operation }) => {
  if (operation === 'create') {
    console.log('---------------------------------');
    console.log('📩 ¡NUEVO CONTACTO RECIBIDO!');
    console.log('De:', doc.nombre);
    console.log('Email:', doc.email);
    console.log('Mensaje:', doc.mensaje);
    console.log('---------------------------------');
  }
}

export const Contactos: CollectionConfig = {
  slug: 'contactos',
  access: {
    create: () => true,
    read: () => true,
  },
  admin: {
    useAsTitle: 'email',
  },
  hooks: {
    afterChange: [avisarPorConsola],
  },
  fields: [
    { name: 'nombre', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'mensaje', type: 'textarea', required: true },
  ],
}