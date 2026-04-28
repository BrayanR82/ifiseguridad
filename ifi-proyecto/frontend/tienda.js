/**
 * IFI Seguridad - Lógica de la Tienda
 */

// FUNCIÓN PARA TOGGLE DEL MENÚ HAMBURGUESA
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    }
}

// Cerrar menú al hacer click fuera
document.addEventListener('click', function(event) {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburger && mobileMenu) {
        if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
});

// Efecto de scroll en el navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.padding = '10px';
        } else {
            navbar.style.padding = '20px';
        }
        
        lastScroll = currentScroll;
    });
}

const grid = document.getElementById('productos-grid');
const buscador = document.getElementById('buscador');

// 1. FUNCIÓN PRINCIPAL PARA CARGAR PRODUCTOS
async function cargarProductos(filtro = '') {
    try {
        // Si hay filtro, usamos la consulta de Payload, si no, traemos todos
        const url = filtro 
            ? `http://localhost:3000/api/productos?where[nombre][contains]=${filtro}`
            : `http://localhost:3000/api/productos`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.docs) {
            renderizarProductos(data.docs);
        }
    } catch (error) {
        console.error("Error al conectar con la API de productos:", error);
        grid.innerHTML = '<p>Error al conectar con el servidor.</p>';
    }
}

// 2. FUNCIÓN PARA PINTAR LOS PRODUCTOS EN EL HTML
function renderizarProductos(productos) {
    if (productos.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No se encontraron productos.</p>';
        return;
    }

    grid.innerHTML = productos.map(prod => {
        // --- LÓGICA DE IMAGEN CORREGIDA ---
        let urlImagen = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
        
        if (prod.imagen && prod.imagen.url) {
            // Si la URL ya empieza con http, la dejamos igual, si no, le pegamos el localhost
            urlImagen = prod.imagen.url.startsWith('http') 
                ? prod.imagen.url 
                : `http://localhost:3000${prod.imagen.url}`;
        }

        // Descripción corta si existe
        let descripcion = '';
        if (prod.descripcion) {
            const textoPlano = typeof prod.descripcion === 'string' ? prod.descripcion : 
                               (prod.descripcion.root?.children?.[0]?.children?.[0]?.text || '');
            const textoCorto = textoPlano.substring(0, 80) + (textoPlano.length > 80 ? '...' : '');
            descripcion = `<p style="color: var(--gray-text); font-size: 0.9rem; line-height: 1.6;">${textoCorto}</p>`;
        }

        return `
            <div class="product-card" onclick="abrirProductoModal('${prod.id}')" style="cursor: pointer;">
                <img src="${urlImagen}" alt="${prod.nombre}">
                <div class="product-info">
                    <h3>${prod.nombre}</h3>
                    ${descripcion}
                    <p class="product-price">$${prod.precio.toLocaleString()}</p>
                    <p class="stock-badge">✓ ${prod.stock} disponibles</p>
                    <button class="btn-comprar" onclick="agregarAlCarrito('${prod.id}'); event.stopPropagation();">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// 3. EVENTO PARA EL BUSCADOR (TIEMPO REAL)
if (buscador) {
    buscador.addEventListener('input', (e) => {
        cargarProductos(e.target.value);
    });
}

// 4. EJECUTAR AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos(); // Carga inicial de todos los productos
});

// 5. FUNCIÓN SIMULADA PARA EL CARRITO (PRÓXIMO PASO)

// Intentamos leer lo que hay guardado. Si no hay nada, empezamos con []
let carrito = JSON.parse(localStorage.getItem('carrito_ifi')) || [];

// Ejecutamos la interfaz nada más cargar para que el contador del header aparezca
document.addEventListener('DOMContentLoaded', () => {
    // Limpiar localStorage si el carrito está vacío
    if (carrito.length === 0) {
        localStorage.removeItem('carrito_ifi');
    }
    actualizarInterfazCarrito();
    cargarProductos(); 
});
// 1. Función para añadir o sumar productos
function agregarAlCarrito(id) {
    // Verificamos si el producto ya está en el carrito para solo sumar cantidad
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
        actualizarInterfazCarrito();
        abrirCarrito();
    } else {
        // Si no existe, lo traemos de la API
        fetch(`http://localhost:3000/api/productos/${id}`)
            .then(res => res.json())
            .then(producto => {
                // Le añadimos la propiedad cantidad inicial
                producto.cantidad = 1;
                carrito.push(producto);
                actualizarInterfazCarrito();
                abrirCarrito();
            });
    }
}

// 2. Abrir y Cerrar Carrito
function abrirCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    const overlay = document.getElementById('carrito-overlay');
    sidebar.style.right = '0';
    overlay.style.display = 'block';
    setTimeout(() => overlay.style.opacity = '1', 10);
}

function cerrarCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    const overlay = document.getElementById('carrito-overlay');
    sidebar.style.right = '-420px';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 300);
}

// 3. Dibujar los productos en el carrito con controles de cantidad
function actualizarInterfazCarrito() {
    const contenedor = document.getElementById('carrito-items');
    const totalElemento = document.getElementById('carrito-total');
    let total = 0;

    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--gray-text);">
                <h3 style="font-size: 1.2rem; color: var(--black); margin-bottom: 10px; font-weight: 600;">Tu carrito está vacío</h3>
                <p style="font-size: 0.95rem; line-height: 1.6;">Añade productos para empezar tu compra</p>
            </div>
        `;
        totalElemento.innerText = 'Total: $0';
        document.getElementById('carrito-count').style.display = 'none';
        localStorage.removeItem('carrito_ifi');
        return;
    }

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        // --- LÓGICA DE IMAGEN CORREGIDA PARA EL CARRITO ---
        let urlImagen = 'https://via.placeholder.com/50x50?text=Error';
        
        if (item.imagen && item.imagen.url) {
            // Si la URL no tiene el dominio, se lo pegamos
            urlImagen = item.imagen.url.startsWith('http') 
                ? item.imagen.url 
                : `http://localhost:3000${item.imagen.url}`;
        }

        contenedor.innerHTML += `
            <div class="carrito-item" style="padding: 18px 0; border-bottom: 1px solid #e8eaf5; display: flex; gap: 15px; align-items: flex-start;">
                <img src="${urlImagen}" style="width: 75px; height: 75px; object-fit: cover; border-radius: 12px; background: linear-gradient(135deg, #f8f9ff 0%, #f0f2f8 100%); flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                <div style="flex: 1; min-width: 0;">
                    <h4 style="margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--black); line-height: 1.3;">${item.nombre}</h4>
                    <p style="margin: 0 0 12px 0; background: linear-gradient(135deg, var(--blue), #001650); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 700; font-size: 1rem;">$${item.precio.toLocaleString()}</p>
                    
                    <div style="display: flex; align-items: center; gap: 10px; background: #f8f9ff; width: fit-content; border-radius: 25px; padding: 4px 6px; border: 1px solid #e8eaf5;">
                        <button onclick="cambiarCantidad('${item.id}', -1)" style="cursor: pointer; width: 28px; height: 28px; border: none; background: white; border-radius: 50%; font-weight: 700; color: var(--blue); transition: var(--transition); box-shadow: 0 2px 6px rgba(0,0,0,0.08);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">−</button>
                        <span style="font-weight: 700; font-size: 1rem; min-width: 24px; text-align: center; color: var(--black);">${item.cantidad}</span>
                        <button onclick="cambiarCantidad('${item.id}', 1)" style="cursor: pointer; width: 28px; height: 28px; border: none; background: white; border-radius: 50%; font-weight: 700; color: var(--blue); transition: var(--transition); box-shadow: 0 2px 6px rgba(0,0,0,0.08);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">+</button>
                    </div>
                </div>
                <div style="text-align: right; flex-shrink: 0;">
                    <p style="margin: 0 0 12px 0; font-size: 1.05rem; font-weight: 700; color: var(--black);">$${subtotal.toLocaleString()}</p>
                    <button onclick="eliminarDelCarrito(${index})" style="background: rgba(239, 68, 68, 0.1); border: none; color: #ef4444; cursor: pointer; font-size: 0.75rem; font-weight: 600; transition: var(--transition); padding: 6px 12px; border-radius: 15px;" onmouseover="this.style.background='rgba(239, 68, 68, 0.2)'" onmouseout="this.style.background='rgba(239, 68, 68, 0.1)'">Quitar</button>
                </div>
            </div>
        `;

        localStorage.setItem('carrito_ifi', JSON.stringify(carrito));
    });

    const contador = document.getElementById('carrito-count');
    // Sumamos todas las cantidades de los productos en el carrito
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    if (totalProductos > 0) {
        contador.innerText = totalProductos;
        contador.style.display = 'block';
    } else {
        contador.style.display = 'none';
    }

    totalElemento.innerText = `Total: $${total.toLocaleString()}`;
}

// 4. Función para cambiar cantidad (+ o -)
function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad += cambio;
        
        // Si la cantidad llega a 0, lo eliminamos
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(item => item.id !== id);
        }
        actualizarInterfazCarrito();
    }
}

// 5. Eliminar producto completamente
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarInterfazCarrito();
}

// 6. Finalizar compra (WhatsApp mejorado con cantidades)
function irAPagar() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Añade productos antes de continuar.");
        return;
    }
    
    let mensaje = "*Hola IFI Seguridad*, quiero realizar el siguiente pedido:\n\n";
    let totalFinal = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalFinal += subtotal;
        mensaje += `*${item.cantidad}x* ${item.nombre}\n   $${subtotal.toLocaleString()}\n\n`;
    });
    
    mensaje += `━━━━━━━━━━━━━━━\n *TOTAL: $${totalFinal.toLocaleString()}*\n\n¿Pueden confirmar disponibilidad? Gracias! `;
    
    // REEMPLAZA "TUNUMERO" con tu número real (ej: 34600000000)
    const urlWhatsapp = `https://wa.me/34641351122?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, '_blank');
}

// 7. Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarInterfazCarrito();
});

// ============ FUNCIONES PARA LA MODAL DE PRODUCTO ============

// Variable para almacenar el producto actual en la modal
let productoModalActual = null;
let cantidadModalActual = 1;

// 1. Abrir Modal con detalles del producto
async function abrirProductoModal(productoId) {
    try {
        // Traer datos del producto
        const response = await fetch(`http://localhost:3000/api/productos/${productoId}`);
        const producto = await response.json();
        
        productoModalActual = producto;
        cantidadModalActual = 1;

        // Construir URL de imagen
        let urlImagen = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
        if (producto.imagen && producto.imagen.url) {
            urlImagen = producto.imagen.url.startsWith('http') 
                ? producto.imagen.url 
                : `http://localhost:3000${producto.imagen.url}`;
        }

        // Procesar descripción completa
        let descripcionCompleta = '';
        if (producto.descripcion) {
            if (typeof producto.descripcion === 'string') {
                descripcionCompleta = producto.descripcion;
            } else {
                descripcionCompleta = producto.descripcion.root?.children?.[0]?.children?.[0]?.text || 'Sin descripción';
            }
        }

        // Llenar la modal con los datos
        document.getElementById('modal-imagen').src = urlImagen;
        document.getElementById('modal-titulo').innerText = producto.nombre;
        document.getElementById('modal-precio').innerText = `$${producto.precio.toLocaleString()}`;
        document.getElementById('modal-stock').innerHTML = `✓ ${producto.stock} disponibles`;
        document.getElementById('modal-descripcion').innerText = descripcionCompleta;
        document.getElementById('modal-cantidad-valor').innerText = '1';

        // Mostrar modal
        const modal = document.getElementById('producto-modal');
        modal.classList.add('activa');
        document.body.style.overflow = 'hidden';

    } catch (error) {
        console.error('Error al abrir modal:', error);
        alert('Error al cargar los detalles del producto');
    }
}

// 2. Cerrar Modal
function cerrarProductoModal(event) {
    // Si se hace clic en el overlay (no en el contenido), cerrar
    if (!event || event.target.id === 'producto-modal') {
        const modal = document.getElementById('producto-modal');
        modal.classList.remove('activa');
        document.body.style.overflow = 'auto';
        productoModalActual = null;
        cantidadModalActual = 1;
    }
}

// 3. Cambiar cantidad en la modal
function cambiarCantidadModal(cambio) {
    cantidadModalActual += cambio;
    
    // Evitar cantidad menor a 1 o mayor al stock disponible
    if (cantidadModalActual < 1) {
        cantidadModalActual = 1;
    }
    if (productoModalActual && cantidadModalActual > productoModalActual.stock) {
        cantidadModalActual = productoModalActual.stock;
    }
    
    document.getElementById('modal-cantidad-valor').innerText = cantidadModalActual;
}

// 4. Agregar al carrito desde la modal con cantidad
function agregarAlCarritoDesdeModal() {
    if (!productoModalActual) return;

    const id = productoModalActual.id;
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += cantidadModalActual;
    } else {
        // Agregar con la cantidad seleccionada
        productoModalActual.cantidad = cantidadModalActual;
        carrito.push(productoModalActual);
    }

    actualizarInterfazCarrito();
    
    // Cerrar modal y abrir carrito
    cerrarProductoModal();
    abrirCarrito();
}


function renderizarPaypal() {
    // Limpiamos el contenedor por si ya había botones
    document.getElementById('paypal-button-container').innerHTML = '';

    paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'gold',
            shape:  'rect',
            label:  'pay'
        },
        createOrder: (data, actions) => {
            // Calculamos el total real del carrito
            const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toString() // Ejemplo: "150.00"
                    }
                }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then(function(details) {
                alert('¡Pago completado con éxito por ' + details.payer.name.given_name + '!');
                // Aquí puedes vaciar el carrito y cerrar el panel
                carrito = [];
                actualizarInterfazCarrito();
                cerrarCarrito();
            });
        },
        onError: (err) => {
            console.error('Error en el pago:', err);
            alert('Hubo un error con el proceso de pago.');
        }
    }).render('#paypal-button-container');
}