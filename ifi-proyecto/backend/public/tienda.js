/**
 * IFI Seguridad - Lógica de la Tienda (Versión Vercel/Producción)
 */

// FUNCIÓN PARA TOGGLE DEL MENÚ HAMBURGUESA
// Añade esto arriba del todo
const BASE_URL = 'https://ifiseguridad.vercel.app';
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    }
}

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

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        navbar.style.padding = currentScroll > 50 ? '10px' : '20px';
        lastScroll = currentScroll;
    });
}

const grid = document.getElementById('productos-grid');
const buscador = document.getElementById('buscador');

// 1. CARGAR PRODUCTOS (Ruta relativa corregida)
async function cargarProductos(filtro = '') {
    try {
        // Usamos la URL completa de Vercel
        const url = filtro 
            ? `${BASE_URL}/api/productos?where[nombre][contains]=${filtro}`
            : `${BASE_URL}/api/productos`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        
        const data = await response.json();

        if (data.docs) {
            renderizarProductos(data.docs);
        }
    } catch (error) {
        console.error("Error al conectar con la API de productos:", error);
        if (grid) grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Error al conectar con el servidor.</p>';
    }
}

// 2. RENDERIZAR PRODUCTOS
function renderizarProductos(productos) {
    if (!grid) return;
    if (productos.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No se encontraron productos.</p>';
        return;
    }

    grid.innerHTML = productos.map(prod => {
        // --- CAMBIO AQUÍ: Usamos el campo de texto que creamos ---
        // Si en tu colección de Productos pusiste name: 'imagenUrl', usa prod.imagenUrl
        let urlImagen = prod.imagenUrl || 'https://via.placeholder.com/300x200?text=Sin+Imagen';

        let descripcion = '';
        if (prod.descripcion) {
            const textoPlano = typeof prod.descripcion === 'string' ? prod.descripcion : 
                               (prod.descripcion.root?.children?.[0]?.children?.[0]?.text || '');
            const textoCorto = textoPlano.substring(0, 80) + (textoPlano.length > 80 ? '...' : '');
            descripcion = `<p style="color: var(--gray-text); font-size: 0.9rem; line-height: 1.6;">${textoCorto}</p>`;
        }

        return `
            <div class="product-card" onclick="abrirProductoModal('${prod.id}')" style="cursor: pointer;">
                <img src="${urlImagen}" alt="${prod.nombre}" onerror="this.src='https://via.placeholder.com/300x200?text=Error+Link'">
                <div class="product-info">
                    <h3>${prod.nombre}</h3>
                    ${descripcion}
                    <p class="product-price">$${prod.precio.toLocaleString()}</p>
                    <p class="stock-badge">✓ ${prod.stock} disponibles</p>
                    <button class="btn-comprar" onclick="agregarAlCarrito('${prod.id}'); event.stopPropagation();">
                        🛒 Añadir al carrito
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

if (buscador) {
    buscador.addEventListener('input', (e) => cargarProductos(e.target.value));
}

// --- LÓGICA DEL CARRITO ---
let carrito = JSON.parse(localStorage.getItem('carrito_ifi')) || [];

function agregarAlCarrito(id) {
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
        actualizarInterfazCarrito();
        abrirCarrito();
    } else {
        // CAMBIO: Quitamos localhost
        fetch(`${BASE_URL}/api/productos/${id}`)
            .then(res => res.json())
            .then(producto => {
                producto.cantidad = 1;
                carrito.push(producto);
                actualizarInterfazCarrito();
                abrirCarrito();
            });
    }
}

function abrirCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    const overlay = document.getElementById('carrito-overlay');
    if (sidebar && overlay) {
        sidebar.style.right = '0';
        overlay.style.display = 'block';
        setTimeout(() => overlay.style.opacity = '1', 10);
    }
}

function cerrarCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    const overlay = document.getElementById('carrito-overlay');
    if (sidebar && overlay) {
        sidebar.style.right = '-420px';
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
    }
}

function actualizarInterfazCarrito() {
    const contenedor = document.getElementById('carrito-items');
    const totalElemento = document.getElementById('carrito-total');
    if (!contenedor || !totalElemento) return;

    let total = 0;
    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = `<div style="text-align: center; padding: 60px 20px; color: var(--gray-text);">Tu carrito está vacío</div>`;
        totalElemento.innerText = 'Total: $0';
        document.getElementById('carrito-count').style.display = 'none';
        return;
    }

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        let urlImagen = item.imagen?.url || 'https://via.placeholder.com/50x50?text=Error';

        contenedor.innerHTML += `
            <div class="carrito-item" style="padding: 15px 0; border-bottom: 1px solid #eee; display: flex; gap: 10px;">
                <img src="${urlImagen}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0; font-size: 0.9rem;">${item.nombre}</h4>
                    <p style="margin: 5px 0; font-weight: bold;">$${item.precio.toLocaleString()}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button onclick="cambiarCantidad('${item.id}', -1)">−</button>
                        <span>${item.cantidad}</span>
                        <button onclick="cambiarCantidad('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button onclick="eliminarDelCarrito(${index})" style="color: red; background: none; border: none; cursor: pointer;">🗑️</button>
            </div>
        `;
    });

    localStorage.setItem('carrito_ifi', JSON.stringify(carrito));
    const contador = document.getElementById('carrito-count');
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    
    if (contador) {
        contador.innerText = totalProductos;
        contador.style.display = totalProductos > 0 ? 'block' : 'none';
    }
    totalElemento.innerText = `Total: $${total.toLocaleString()}`;
}

function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) carrito = carrito.filter(item => item.id !== id);
        actualizarInterfazCarrito();
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarInterfazCarrito();
}

function irAPagar() {
    if (carrito.length === 0) return alert("El carrito está vacío");
    let mensaje = "*IFI Seguridad - Pedido*\n\n";
    carrito.forEach(item => mensaje += `*${item.cantidad}x* ${item.nombre} - $${(item.precio * item.cantidad).toLocaleString()}\n`);
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    mensaje += `\n*TOTAL: $${total.toLocaleString()}*`;
    window.open(`https://wa.me/34641351122?text=${encodeURIComponent(mensaje)}`, '_blank');
}

// --- MODAL DE PRODUCTO ---
let productoModalActual = null;
let cantidadModalActual = 1;

async function abrirProductoModal(productoId) {
    try {
        // CAMBIO: Quitamos localhost
        const response = await fetch(`/api/productos/${productoId}`);
        const producto = await response.json();
        
        productoModalActual = producto;
        cantidadModalActual = 1;

let urlImagen = producto.imagenUrl || 'https://via.placeholder.com/300x200?text=Sin+Imagen';        let desc = typeof producto.descripcion === 'string' ? producto.descripcion : 
                   (producto.descripcion?.root?.children?.[0]?.children?.[0]?.text || 'Sin descripción');

        document.getElementById('modal-imagen').src = urlImagen;
        document.getElementById('modal-titulo').innerText = producto.nombre;
        document.getElementById('modal-precio').innerText = `$${producto.precio.toLocaleString()}`;
        document.getElementById('modal-stock').innerHTML = `✓ ${producto.stock} disponibles`;
        document.getElementById('modal-descripcion').innerText = desc;
        document.getElementById('modal-cantidad-valor').innerText = '1';

        document.getElementById('producto-modal').classList.add('activa');
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error:', error);
    }
}

function cerrarProductoModal(event) {
    if (!event || event.target.id === 'producto-modal' || event.target.id === 'btn-cerrar-modal') {
        document.getElementById('producto-modal').classList.remove('activa');
        document.body.style.overflow = 'auto';
    }
}

function cambiarCantidadModal(cambio) {
    cantidadModalActual += cambio;
    if (cantidadModalActual < 1) cantidadModalActual = 1;
    if (productoModalActual && cantidadModalActual > productoModalActual.stock) cantidadModalActual = productoModalActual.stock;
    document.getElementById('modal-cantidad-valor').innerText = cantidadModalActual;
}

function agregarAlCarritoDesdeModal() {
    if (!productoModalActual) return;
    const existente = carrito.find(item => item.id === productoModalActual.id);
    if (existente) existente.cantidad += cantidadModalActual;
    else {
        productoModalActual.cantidad = cantidadModalActual;
        carrito.push(productoModalActual);
    }
    actualizarInterfazCarrito();
    cerrarProductoModal();
    abrirCarrito();
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarInterfazCarrito();
});