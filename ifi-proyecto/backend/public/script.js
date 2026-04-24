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
let scrollTicking = false;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

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

function initTestimonialCarousel() {
    const carousel = document.querySelector('[data-testimonial-carousel]');
    if (!carousel) return;

    const track = carousel.querySelector('[data-carousel-track]');
    const viewport = carousel.querySelector('[data-carousel-viewport]');
    const prevBtn = carousel.querySelector('[data-direction="prev"]');
    const nextBtn = carousel.querySelector('[data-direction="next"]');
    const dotsContainer = document.querySelector('[data-carousel-dots]');

    if (!track || !viewport || !prevBtn || !nextBtn || !dotsContainer) return;

    const slides = Array.from(track.children);
    let currentIndex = 0;
    let slidesPerView = 1;

    function getSlidesPerView() {
        return window.matchMedia('(max-width: 768px)').matches ? 1 : 2;
    }

    function getMaxIndex() {
        return Math.max(0, slides.length - slidesPerView);
    }

    function createDots() {
        const pageCount = getMaxIndex() + 1;
        dotsContainer.innerHTML = '';

        for (let i = 0; i < pageCount; i += 1) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Ir a reseña ${i + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateCarousel() {
        const offsetPercent = (100 / slidesPerView) * currentIndex;
        track.style.transform = `translateX(-${offsetPercent}%)`;
        updateDots();
    }

    function goToIndex(index) {
        const maxIndex = getMaxIndex();

        if (index > maxIndex) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = maxIndex;
        } else {
            currentIndex = index;
        }

        updateCarousel();
    }

    function syncLayout() {
        slidesPerView = getSlidesPerView();
        carousel.style.setProperty('--slides-per-view', String(slidesPerView));
        currentIndex = Math.min(currentIndex, getMaxIndex());
        createDots();
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => goToIndex(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToIndex(currentIndex + 1));

    let touchStartX = 0;
    viewport.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    viewport.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const delta = touchEndX - touchStartX;

        if (Math.abs(delta) < 40) return;

        if (delta > 0) {
            goToIndex(currentIndex - 1);
        } else {
            goToIndex(currentIndex + 1);
        }
    }, { passive: true });

    window.addEventListener('resize', syncLayout);
    syncLayout();
}

// 3. EJECUTAR AL CARGAR
document.addEventListener('DOMContentLoaded', () => {
    cargarServiciosDesdeCMS();
    initTestimonialCarousel();
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

            // Procesar el texto enriquecido de Payload (Lexical)
            let detallesHTML = "";
            if (servicio.detalles && servicio.detalles.root && servicio.detalles.root.children) {
                detallesHTML = servicio.detalles.root.children.map(block => {
                    const texto = block.children ? block.children.map(c => c.text || "").join("") : "";
                    return texto ? `<p style="margin-bottom: 15px;">${texto}</p>` : "";
                }).join("");
            } else {
                detallesHTML = "<p>No hay detalles adicionales disponibles.</p>";
            }

            // Aplicar estilos al modal
            

            // Dentro de la función verMas(id), busca la parte de los estilos:

            Object.assign(modal.style, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                zIndex: '1000',
                maxWidth: '500px', // Un poco más estrecho para que sea cómodo
                width: '90%',
                maxHeight: '80vh', // Máximo 80% de la altura de la pantalla
                display: 'block',  // Cambiamos flex por block para mejor manejo de scroll
                overflowY: 'auto', // Scroll vertical si el texto es largo
                overflowX: 'hidden', // BLOQUEA el scroll horizontal
                boxSizing: 'border-box',
                wordBreak: 'break-word' // ROMPE palabras largas (como eeeeeee...)
            });

            // También asegúrate de que el contenedor de detalles tenga el ajuste:
            modal.innerHTML = `
                <div style="width: 100%; overflow-x: hidden;">
                    <h2 style="margin-top: 0; color: #333; word-break: break-word;">${servicio.titulo}</h2>
                    <div style="color: #666; line-height: 1.6; margin-bottom: 20px; word-break: break-word;">
                        <strong>Resumen:</strong> ${servicio.resumen || 'Sin resumen'}
                    </div>
                    <div style="border-top: 1px solid #eee; padding-top: 15px;">
                        <h4 style="margin-bottom: 10px;">Información:</h4>
                        <div class="detalles-contenido" style="color: #444; line-height: 1.6; word-break: break-word;">
                            ${detallesHTML}
                        </div>
                    </div>
                    <button id="btn-cerrar-modal" style="width: 100%; background-color: #666; border: none; margin-top: 20px; cursor: pointer; color: white; padding: 12px; border-radius: 5px; font-weight: bold;">
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
        })
        .catch(err => console.error("Error cargando detalles:", err));
}