/**
 * IFI Seguridad - Lógica de la Tienda (Versión Ultra-Segura)
 */

// --- CONFIGURACIÓN ---
const BASE_URL = 'https://ifiseguridad.vercel.app';

// --- UTILIDADES ---
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    }
}

// --- VARIABLES GLOBALES ---
const grid = document.getElementById('productos-grid');
const buscador = document.getElementById('buscador');
let carrito = JSON.parse(localStorage.getItem('carrito_ifi')) || [];

// --- 1. CARGAR PRODUCTOS ---
async function cargarProductos(filtro = '') {
    try {
        const url = filtro 
            ? `${BASE_URL}/api/productos?where[nombre][contains]=${filtro}`
            : `${BASE_URL}/api/productos`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        
        const data = await response.json();

        if (data && data.docs) {
            renderizarProductos(data.docs);
        }
    } catch (error) {
        console.error("Error al conectar con la API:", error);
        if (grid) grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: red;">Error al cargar productos. Por favor, intenta más tarde.</p>';
    }
}

// --- 2. RENDERIZAR PRODUCTOS ---
function renderizarProductos(productos) {
    if (!grid) return;
    if (productos.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No se encontraron productos.</p>';
        return;
    }

    grid.innerHTML = productos.map(prod => {
        // PROTECCIÓN: Imagen
        const urlImagen = prod.imagenUrl || 'https://via.placeholder.com/300x200?text=Sin+Imagen';
        
        // PROTECCIÓN: Precio (Si no hay precio, ponemos 0 para que no falle toLocaleString)
        const precioSeguro = prod.precio || 0;

        // PROTECCIÓN: Descripción
        let descripcionHtml = '';
        if (prod.descripcion) {
            const textoPlano = typeof prod.descripcion === 'string' ? prod.descripcion : 
                               (prod.descripcion.root?.children?.[0]?.children?.[0]?.text || '');
            const textoCorto = textoPlano.substring(0, 80) + (textoPlano.length > 80 ? '...' : '');
            descripcionHtml = `<p style="color: var(--gray-text); font-size: 0.9rem;">${textoCorto}</p>`;
        }

        return `
            <div class="product-card" onclick="abrirProductoModal('${prod.id}')" style="cursor: pointer;">
                <img src="${urlImagen}" alt="${prod.nombre || 'Producto'}" onerror="this.src='https://via.placeholder.com/300x200?text=Error+Imagen'">
                <div class="product-info">
                    <h3>${prod.nombre || 'Producto sin nombre'}</h3>
                    ${descripcionHtml}
                    <p class="product-price">$${precioSeguro.toLocaleString()}</p>
                    <p class="stock-badge">✓ ${prod.stock || 0} disponibles</p>
                    <button class="btn-comprar" onclick="agregarAlCarrito('${prod.id}'); event.stopPropagation();">
                        🛒 Añadir al carrito
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// --- 3. LÓGICA DEL CARRITO ---
function actualizarInterfazCarrito() {
    const contenedor = document.getElementById('carrito-items');
    const totalElemento = document.getElementById('carrito-total');
    if (!contenedor || !totalElemento) return;

    let total = 0;
    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = `<div style="text-align: center; padding: 60px 20px; color: var(--gray-text);">Tu carrito está vacío</div>`;
        totalElemento.innerText = 'Total: $0';
        const contador = document.getElementById('carrito-count');
        if (contador) contador.style.display = 'none';
        return;
    }

    carrito.forEach((item, index) => {
        const precioItem = item.precio || 0;
        const subtotal = precioItem * item.cantidad;
        total += subtotal;
        const urlImagen = item.imagenUrl || 'https://via.placeholder.com/50x50?text=Error';

        contenedor.innerHTML += `
            <div class="carrito-item" style="padding: 15px 0; border-bottom: 1px solid #eee; display: flex; gap: 10px;">
                <img src="${urlImagen}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0; font-size: 0.9rem;">${item.nombre}</h4>
                    <p style="margin: 5px 0; font-weight: bold;">$${precioItem.toLocaleString()}</p>
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

async function agregarAlCarrito(id) {
    const existente = carrito.find(item => item.id === id);
    if (existente) {
        existente.cantidad += 1;
        actualizarInterfazCarrito();
        abrirCarrito();
    } else {
        try {
            const res = await fetch(`${BASE_URL}/api/productos/${id}`);
            const producto = await res.json();
            producto.cantidad = 1;
            carrito.push(producto);
            actualizarInterfazCarrito();
            abrirCarrito();
        } catch (e) {
            console.error("Error al añadir al carrito:", e);
        }
    }
}

// --- 4. MODAL DE PRODUCTO ---
let productoModalActual = null;
let cantidadModalActual = 1;

async function abrirProductoModal(productoId) {
    try {
        const response = await fetch(`${BASE_URL}/api/productos/${productoId}`);
        const producto = await response.json();
        
        productoModalActual = producto;
        cantidadModalActual = 1;

        const urlImagen = producto.imagenUrl || 'https://via.placeholder.com/300x200?text=Sin+Imagen';
        const precioModal = producto.precio || 0;
        const desc = typeof producto.descripcion === 'string' ? producto.descripcion : 
                     (producto.descripcion?.root?.children?.[0]?.children?.[0]?.text || 'Sin descripción');

        document.getElementById('modal-imagen').src = urlImagen;
        document.getElementById('modal-titulo').innerText = producto.nombre || 'Sin nombre';
        document.getElementById('modal-precio').innerText = `$${precioModal.toLocaleString()}`;
        document.getElementById('modal-stock').innerHTML = `✓ ${producto.stock || 0} disponibles`;
        document.getElementById('modal-descripcion').innerText = desc;
        document.getElementById('modal-cantidad-valor').innerText = '1';

        document.getElementById('producto-modal').classList.add('activa');
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error al abrir modal:', error);
    }
}

// --- FUNCIONES DE NAVEGACIÓN ---
function abrirCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    const overlay = document.getElementById('carrito-overlay');
    if(sidebar) sidebar.style.right = '0';
    if(overlay) {
        overlay.style.display = 'block';
        setTimeout(() => overlay.style.opacity = '1', 10);
    }
}

function cerrarCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    const overlay = document.getElementById('carrito-overlay');
    if(sidebar) sidebar.style.right = '-420px';
    if(overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
    }
}

function cerrarProductoModal(event) {
    if (!event || event.target.id === 'producto-modal' || event.target.id === 'btn-cerrar-modal') {
        document.getElementById('producto-modal').classList.remove('activa');
        document.body.style.overflow = 'auto';
    }
}

function irAPagar() {
    if (carrito.length === 0) return alert("El carrito está vacío");
    let mensaje = "*IFI Seguridad - Pedido*\n\n";
    carrito.forEach(item => {
        const p = item.precio || 0;
        mensaje += `*${item.cantidad}x* ${item.nombre} - $${(p * item.cantidad).toLocaleString()}\n`;
    });
    const total = carrito.reduce((acc, item) => acc + ((item.precio || 0) * item.cantidad), 0);
    mensaje += `\n*TOTAL: $${total.toLocaleString()}*`;
    window.open(`https://wa.me/34641351122?text=${encodeURIComponent(mensaje)}`, '_blank');
}

// --- EVENTOS ---
if (buscador) buscador.addEventListener('input', (e) => cargarProductos(e.target.value));

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarInterfazCarrito();
});