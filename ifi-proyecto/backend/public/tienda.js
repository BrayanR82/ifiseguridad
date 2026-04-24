/**
 * IFI Seguridad - Lógica de la Tienda (Versión Ultra-Segura y Adaptativa)
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

// --- HEADER QUE SE OCULTA AL HACER SCROLL EN TODAS LAS VISTAS ---
let lastScroll = 0;
let scrollTicking = false;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (scrollTicking) return;
    scrollTicking = true;

    window.requestAnimationFrame(() => {
        navbar.style.padding = currentScroll > 50 ? '10px' : '20px';

        const scrollingDown = currentScroll > lastScroll && currentScroll > 80;
        navbar.classList.toggle('navbar-hidden', scrollingDown);

        lastScroll = currentScroll;
        scrollTicking = false;
    });
});

// --- VARIABLES GLOBALES ---
const grid = document.getElementById('productos-grid');
const buscador = document.getElementById('buscador');
let carrito = JSON.parse(localStorage.getItem('carrito_ifi')) || [];
let productoModalActualId = null;
let cantidadModal = 1;

function actualizarContadoresCarrito(totalProductos) {
    const contadorHeader = document.getElementById('carrito-count');
    const contadorFlotante = document.getElementById('cart-float-count');

    [contadorHeader, contadorFlotante].forEach((contador) => {
        if (!contador) return;

        if (totalProductos > 0) {
            contador.innerText = totalProductos;
            contador.style.display = 'flex';
        } else {
            contador.style.display = 'none';
        }
    });
}

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
        if (grid) grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: red;">Error al cargar productos.</p>';
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
        const urlImagen = prod.imagenUrl || 'https://via.placeholder.com/300x200?text=Sin+Imagen';
        const precioSeguro = prod.precio || 0;

        let descripcionHtml = '';
        if (prod.descripcion) {
            const textoPlano = typeof prod.descripcion === 'string' ? prod.descripcion : 
                               (prod.descripcion.root?.children?.[0]?.children?.[0]?.text || '');
            const textoCorto = textoPlano.substring(0, 80) + (textoPlano.length > 80 ? '...' : '');
            descripcionHtml = `<p style="color: var(--gray-text); font-size: 0.9rem; word-break: break-word;">${textoCorto}</p>`;
        }

        return `
            <div class="product-card" onclick="abrirProductoModal('${prod.id}')" style="cursor: pointer;">
                <img src="${urlImagen}" alt="${prod.nombre || 'Producto'}" onerror="this.src='https://via.placeholder.com/300x200?text=Error+Imagen'">
                <div class="product-info">
                    <h3 style="word-break: break-word;">${prod.nombre || 'Producto sin nombre'}</h3>
                    ${descripcionHtml}
                    <p class="product-price">$${precioSeguro.toLocaleString()}</p>
                    <p class="stock-badge">✓ ${prod.stock || 0} disponibles</p>
                    <button class="btn-comprar" onclick="agregarAlCarrito('${prod.id}', event)">
                        Añadir al carrito
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
        contenedor.innerHTML = `<div class="cart-empty">Tu carrito está vacío</div>`;
        totalElemento.innerText = 'Total: $0';
        actualizarContadoresCarrito(0);
        return;
    }

    carrito.forEach((item, index) => {
        const precioItem = item.precio || 0;
        const subtotal = precioItem * item.cantidad;
        total += subtotal;
        const urlImagen = item.imagenUrl || 'https://via.placeholder.com/50x50?text=Error';

        contenedor.innerHTML += `
            <div class="cart-item">
                <img src="${urlImagen}" class="cart-item-image" alt="${item.nombre || 'Producto'}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.nombre}</h4>
                    <p class="cart-item-price">$${precioItem.toLocaleString()}</p>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" onclick="cambiarCantidad('${item.id}', -1)" aria-label="Disminuir cantidad">−</button>
                        <span class="cart-qty-value">${item.cantidad}</span>
                        <button class="cart-qty-btn" onclick="cambiarCantidad('${item.id}', 1)" aria-label="Aumentar cantidad">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <p class="cart-item-subtotal">$${subtotal.toLocaleString()}</p>
                    <button class="cart-remove-btn" onclick="eliminarDelCarrito(${index})">Quitar</button>
                </div>
            </div>
        `;
    });

    localStorage.setItem('carrito_ifi', JSON.stringify(carrito));
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    actualizarContadoresCarrito(totalProductos);
    totalElemento.innerText = `Total: $${total.toLocaleString()}`;
}

async function agregarAlCarrito(id, event) {
    if (event && typeof event.stopPropagation === 'function') {
        event.stopPropagation();
    }

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

// --- 4. MODAL DE PRODUCTO (CORREGIDO CON SCROLL Y WORD-BREAK) ---
async function abrirProductoModal(productoId) {
    try {
        const response = await fetch(`${BASE_URL}/api/productos/${productoId}`);
        const producto = await response.json();

        productoModalActualId = productoId;
        cantidadModal = 1;
        const cantidadElemento = document.getElementById('modal-cantidad-valor');
        if (cantidadElemento) cantidadElemento.innerText = cantidadModal;
        
        const urlImagen = producto.imagenUrl || 'https://via.placeholder.com/300x200?text=Sin+Imagen';
        const precioModal = producto.precio || 0;
        
        // Procesar descripción para que no falle si es objeto Lexical o String
        let desc = "";
        if (producto.descripcion) {
            if (typeof producto.descripcion === 'string') {
                desc = producto.descripcion;
            } else if (producto.descripcion.root?.children) {
                desc = producto.descripcion.root.children.map(block => 
                    block.children ? block.children.map(c => c.text || "").join("") : ""
                ).join("\n");
            }
        } else {
            desc = 'Sin descripción disponible.';
        }

        // Elementos del Modal
        const modal = document.getElementById('producto-modal');
        const modalContent = modal.querySelector('.modal-content');
        const descElement = document.getElementById('modal-descripcion');

        // Configurar contenido
        document.getElementById('modal-imagen').src = urlImagen;
        document.getElementById('modal-titulo').innerText = producto.nombre || 'Sin nombre';
        document.getElementById('modal-precio').innerText = `$${precioModal.toLocaleString()}`;
        document.getElementById('modal-stock').innerHTML = `✓ ${producto.stock || 0} disponibles`;
        
        // Aplicar descripción con estilos de ruptura de palabras
        descElement.innerText = desc;
        descElement.style.wordBreak = 'break-word';
        descElement.style.whiteSpace = 'pre-wrap';

        // AJUSTES DE SCROLL Y ESTILO PARA EVITAR DESBORDE HORIZONTAL
        Object.assign(modalContent.style, {
            maxHeight: '85vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            wordBreak: 'break-word'
        });

        modal.classList.add('activa');
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error al abrir modal:', error);
    }
}

// --- FUNCIONES DE NAVEGACIÓN ---
function abrirCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    const overlay = document.getElementById('carrito-overlay');
    if (sidebar) sidebar.style.transform = 'translateX(0)';
    if(overlay) {
        overlay.style.display = 'block';
        setTimeout(() => overlay.style.opacity = '1', 10);
    }
}

function cerrarCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    const overlay = document.getElementById('carrito-overlay');
    if (sidebar) sidebar.style.transform = 'translateX(100%)';
    if(overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
    }
}

function cerrarProductoModal(event) {
    if (!event || event.target.id === 'producto-modal' || event.target.id === 'btn-cerrar-modal') {
        document.getElementById('producto-modal').classList.remove('activa');
        document.body.style.overflow = 'auto';
        productoModalActualId = null;
        cantidadModal = 1;
    }
}

function cambiarCantidadModal(delta) {
    cantidadModal = Math.max(1, cantidadModal + delta);
    const cantidadElemento = document.getElementById('modal-cantidad-valor');
    if (cantidadElemento) cantidadElemento.innerText = cantidadModal;
}

async function agregarAlCarritoDesdeModal() {
    if (!productoModalActualId) return;

    for (let i = 0; i < cantidadModal; i += 1) {
        await agregarAlCarrito(productoModalActualId);
    }

    cerrarProductoModal();
}

function cambiarCantidad(id, delta) {
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad += delta;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(p => p.id !== id);
        }
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