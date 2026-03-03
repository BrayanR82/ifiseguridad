const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51T6XpT3gvMQZZyJYf2bJ3hgnOGgbK5AfWnQ8x5YrJ2GgCL2CstqZNToPjHyWZ9uc448IcEO3HjOphCZxV3qjmhpD002hIodnGb');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname))); // Servir archivos estáticos
app.use(express.json());
app.use(cors());

// Base de datos ficticia de productos (deben coincidir con el frontend)
const storeItems = new Map([
  [1, { priceInCents: 4900, name: "IFI Secure Pro" }],
  [2, { priceInCents: 9900, name: "IFI Enterprise Monitor" }],
]);

// Endpoint para crear la sesión de Stripe
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { itemId } = req.body;
    const item = storeItems.get(itemId);

    if (!item) {
      return res.status(400).json({ error: "Producto no encontrado" });
    }

    const session = await stripe.checkout.sessions.create({
    // Forzamos manualmente los tipos que queremos ver
    payment_method_types: ['card', 'paypal'], 
    mode: 'payment',
    line_items: [{
        price_data: {
            currency: 'eur',
            product_data: { name: item.name },
            unit_amount: item.priceInCents,
        },
        quantity: 1,
    }],
    success_url: `${req.headers.origin}/success.html?item=${itemId}`,
    cancel_url: `${req.headers.origin}/cancel.html`,
});

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Endpoint para recibir mensajes de contacto
app.post('/send-contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Aquí es donde normalmente enviarías un email. 
    // Por ahora, lo mostraremos en la terminal para confirmar que llega.
    console.log("--- NUEVO MENSAJE DE CONTACTO ---");
    console.log(`Nombre: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Mensaje: ${message}`);
    console.log("---------------------------------");

    res.status(200).json({ status: "ok" });
});

const PORT = 4242;
app.listen(PORT, () => console.log(`Servidor IFI Seguridad corriendo en http://localhost:${PORT}`));