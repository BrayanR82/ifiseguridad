/**
 * IFI Seguridad - Frontend Logic con Conexión a CMS (Versión Vercel)
 */

// 0. FUNCIÓN PARA TOGGLE DEL MENÚ HAMBURGUESA
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

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.style.padding = '10px';
    } else {
        navbar.style.padding = '20px';
    }
    lastScroll = currentScroll;
});

// 1. FUNCIÓN PARA CARGAR SERVICIOS DESDE PAYLOAD CMS
async function cargarServiciosDesdeCMS() {
    try {
        // Usamos la URL absoluta para asegurar la conexión
        const BASE_URL = 'https://ifiseguridad.vercel.app';
        const response = await fetch(`${BASE_URL}/api/servicios`);
        
        if (!response.ok) throw new Error('Error en la respuesta');
        const data = await response.json();

        const serviciosGrid = document.querySelector('#servicios .grid');
        
        if (serviciosGrid && data.docs && data.docs.length > 0) {
            serviciosGrid.innerHTML = '';

            data.docs.forEach(servicio => {
                // CAMBIO CLAVE: Leemos el campo de texto directo 'fotoServicio' o 'imagenUrl'
                // Ajusta el nombre según cómo lo pusiste en Servicios.ts (fotoServicio es el que sugerí antes)
                let urlImagen = servicio.fotoServicio || servicio.imagenUrl || 'https://via.placeholder.com/300x200?text=IFI+Seguridad';

                const card = `
                    <div class="card" style="text-align: center;">
                        <img src="${urlImagen}" alt="${servicio.titulo}" 
                             style="width:100%; max-width:200px; border-radius: 8px; display: block; margin: 0 auto; margin-bottom: 15px;"
                             onerror="this.src='https://via.placeholder.com/300x200?text=Error+al+cargar'">
                        <h3>${servicio.titulo}</h3>
                        <p>${servicio.resumen || 'Sin descripción disponible'}</p>
                        <button class="btn" onclick="verMas('${servicio.id}')" style="margin: 10px auto; display: block;">Leer más</button>
                    </div>
                `;
                serviciosGrid.innerHTML += card;
            });
        }
    } catch (error) {
        console.error("Error cargando servicios:", error);
    }
}
// 2. SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function toggleFaq(element) {
    const item = element.classList.contains('faq-item') ? element : element.closest('.faq-item');
    if (!item) return;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
    });
    if (!isActive) {
        item.classList.add('active');
    }
}

// 3. EJECUTAR AL CARGAR
document.addEventListener('DOMContentLoaded', () => {
    cargarServiciosDesdeCMS();
});

// 4. FUNCIÓN PARA VER MÁS (MODAL)
    
    function verMas(id) {
    const BASE_URL = 'https://ifiseguridad.vercel.app';
    fetch(`${BASE_URL}/api/servicios/${id}`)
        .then(res => res.json())
        .then(servicio => {
     
            let modal = document.getElementById('detalle-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'detalle-modal';
                document.body.appendChild(modal);
            }

            let detallesHTML = "";
            if (servicio.detalles && servicio.detalles.root && servicio.detalles.root.children) {
                servicio.detalles.root.children.forEach(block => {
                    if (block.children) {
                        let parrafoTexto = block.children
                            .map(child => child.text ? child.text : "")
                            .join("");
                        
                        if (parrafoTexto.trim() !== "") {
                            detallesHTML += `<p style="margin-bottom: 15px; display: block;">${parrafoTexto}</p>`;
                        }
                    }
                });
            } else {
                detallesHTML = "<p>No hay detalles adicionales disponibles.</p>";
            }

            Object.assign(modal.style, {
                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff', padding: '30px', borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)', zIndex: '1000',
                maxWidth: '600px', width: '90%', border: '2px solid #007bff',
                maxHeight: '85vh', display: 'flex', flexDirection: 'column',
                overflowY: 'auto', boxSizing: 'border-box'
            });

            modal.innerHTML = `
                <div style="width: 100%;">
                    <h2 style="margin-top: 0; color: #333; word-wrap: break-word;">${servicio.titulo}</h2>
                    <div style="color: #666; line-height: 1.6; margin-bottom: 20px; word-wrap: break-word;">
                        <strong>Resumen:</strong> ${servicio.resumen}
                    </div>
                    <div style="border-top: 1px solid #eee; padding-top: 15px;">
                        <h4 style="margin-bottom: 10px;">Información:</h4>
                        <div class="detalles-contenido" style="color: #444; line-height: 1.6; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">
                            ${detallesHTML}
                        </div>
                    </div>
                    <button class="btn" id="btn-cerrar-modal" style="width: 100%; background-color: #666; border: none; margin-top: 20px; cursor: pointer; color: white; padding: 12px; border-radius: 5px; font-weight: bold;">
                        Cerrar Detalle
                    </button>
                </div>
            `;

            const overlay = document.createElement('div');
            overlay.id = 'modal-overlay';
            Object.assign(overlay.style, {
                position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '999'
            });

            const cerrar = () => { modal.remove(); overlay.remove(); };
            overlay.onclick = cerrar;
            document.body.appendChild(overlay);
            document.getElementById('btn-cerrar-modal').onclick = cerrar;
            modal.scrollTop = 0;
        })
        .catch(err => console.error("Error cargando detalles:", err));
}