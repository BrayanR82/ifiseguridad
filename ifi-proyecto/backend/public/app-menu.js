/**
 * Menú Flotante de Aplicaciones (Móvil)
 * Incluye: WhatsApp, Herramientas, Galería y Selector de Idioma
 */

(function initAppMenu() {
    // Detectar si estamos en una subcarpeta
    const pathname = window.location.pathname.toLowerCase();
    const isInGuiasFolder = pathname.includes('/guias/');
    const basePath = isInGuiasFolder ? '../' : '';
    const imgPath = isInGuiasFolder ? '../img/' : 'img/';

    // HTML del menú flotante
    const menuHTML = `
        <div class="app-menu-container">
            <!-- Botón flotante principal (icono de aplicaciones) -->
            <button class="app-menu-toggle" type="button" aria-label="Abrir menú de aplicaciones" title="Aplicaciones">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="3" y="3" width="4" height="4" rx="0.5" />
                    <rect x="10" y="3" width="4" height="4" rx="0.5" />
                    <rect x="17" y="3" width="4" height="4" rx="0.5" />
                    <rect x="3" y="10" width="4" height="4" rx="0.5" />
                    <rect x="10" y="10" width="4" height="4" rx="0.5" />
                    <rect x="17" y="10" width="4" height="4" rx="0.5" />
                    <rect x="3" y="17" width="4" height="4" rx="0.5" />
                    <rect x="10" y="17" width="4" height="4" rx="0.5" />
                    <rect x="17" y="17" width="4" height="4" rx="0.5" />
                </svg>
            </button>

            <!-- Menú desplegable -->
            <div class="app-menu-panel" role="menu">
                <div class="app-menu-header">
                    <strong>Aplicaciones</strong>
                    <button class="app-menu-close" type="button" aria-label="Cerrar menú">×</button>
                </div>

                <div class="app-menu-items">
                    <!-- WhatsApp -->
                    <a href="https://wa.me/34641351122" target="_blank" class="app-menu-item" rel="noopener" role="menuitem">
                        <span class="app-menu-icon whatsapp">
                            <img src="${imgPath}wa.png" alt="WhatsApp">
                        </span>
                        <span>WhatsApp</span>
                    </a>

                    <!-- Herramientas -->
                    <a href="${basePath}herramientas.html" class="app-menu-item" role="menuitem">
                        <span class="app-menu-icon tools">
                            <img src="${imgPath}herramienta.png" alt="Herramientas">
                        </span>
                        <span>Herramientas</span>
                    </a>

                    <!-- Galería -->
                    <a href="${basePath}galeria.html" class="app-menu-item" role="menuitem">
                        <span class="app-menu-icon gallery">
                            <img src="${imgPath}photo.png" alt="Galería">
                        </span>
                        <span>Galería</span>
                    </a>

                    <!-- Selector de Idioma -->
                    <div class="app-menu-item language-selector-container" role="menuitem">
                        <span class="app-menu-icon language">
                            <img src="${imgPath}idioma.png" alt="Idioma">
                        </span>
                        <span>Idioma</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Función para insertar el menú cuando el DOM esté listo
    function initMenu() {
        if (document.body) {
            document.body.insertAdjacentHTML('beforeend', menuHTML);
            setupMenu();
        } else {
            setTimeout(initMenu, 50);
        }
    }

    // Esperar a que el DOM esté listo para agregar eventos
    function setupMenu() {
        const toggle = document.querySelector('.app-menu-toggle');
        const panel = document.querySelector('.app-menu-panel');
        const closeBtn = document.querySelector('.app-menu-close');
        const langContainer = document.querySelector('.language-selector-container');
        const container = document.querySelector('.app-menu-container');

        if (!toggle || !panel || !container) {
            console.warn('App Menu: elementos no encontrados, reintentando...');
            setTimeout(setupMenu, 500);
            return;
        }

        console.log('App Menu: Inicializado correctamente');

        // Función para actualizar el valor del selector de idioma

        // Función para actualizar el valor del selector de idioma
        function updateLanguageSelectorValue() {
            if (!langContainer) return;
            
            const clone = langContainer.querySelector('.ifi-language-select');
            if (clone) {
                // Leer idioma actual del localStorage
                const currentLang = localStorage.getItem('ifi-language') || 'es';
                clone.value = currentLang;
                console.log('🌐 Idioma actualizado en selector:', currentLang);
            } else {
                console.log('⚠️ Selector aún no clonado');
            }
        }
        // Abrir/cerrar menú
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = panel.classList.contains('is-open');
            console.log('Toggle clicked, isOpen:', isOpen);
            
            // Actualizar selector de idioma antes de mostrar el menú
            if (!isOpen) {
                updateLanguageSelectorValue();
            }
            
            panel.classList.toggle('is-open');
        });

        // Cerrar menú
        closeBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            panel.classList.remove('is-open');
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = container.contains(e.target);
            if (!isClickInsideMenu && panel.classList.contains('is-open')) {
                panel.classList.remove('is-open');
            }
        });

        // Agregar selector de idioma al contenedor de idioma
        setTimeout(() => {
            if (langContainer && !langContainer.querySelector('.ifi-language-select')) {
                const selector = document.querySelector('.ifi-language-select');
                if (selector) {
                    // Clonar el selector
                    const clone = selector.cloneNode(true);
                    langContainer.appendChild(clone);
                    
                    // Agregar eventos al clon
                    clone.addEventListener('change', () => {
                        if (clone.value !== '') {
                            if (window.ifiSetLanguage) {
                                window.ifiSetLanguage(clone.value, true);
                            }
                        }
                    });
                }
            }
        }, 500);

        // Cerrar menú al seleccionar un elemento (excepto el contenedor de idioma)
        document.querySelectorAll('.app-menu-item:not(.language-selector-container)').forEach((item) => {
            item.addEventListener('click', () => {
                setTimeout(() => {
                    panel.classList.remove('is-open');
                }, 100);
            });
        });
    }

    // Inicializar cuando el documento esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
}());
