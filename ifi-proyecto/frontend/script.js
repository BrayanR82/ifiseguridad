/**
 * IFI Seguridad - Frontend Logic con Conexión a CMS
 */

// 1. FUNCIÓN PARA CARGAR SERVICIOS DESDE PAYLOAD CMS
async function cargarServiciosDesdeCMS() {
    try {
        const response = await fetch('http://localhost:3000/api/servicios');
        const data = await response.json();

        const serviciosGrid = document.querySelector('#servicios .grid');
        
        if (serviciosGrid && data.docs && data.docs.length > 0) {
            serviciosGrid.innerHTML = '';

            data.docs.forEach(servicio => {
                let urlImagen = 'https://via.placeholder.com/300x200?text=IFI+Seguridad';
                
                if (servicio.imagen && servicio.imagen.url) {
                    urlImagen = servicio.imagen.url.startsWith('http') 
                        ? servicio.imagen.url 
                        : `http://localhost:3000${servicio.imagen.url}`;
                }

                const card = `
                    <div class="card" style="text-align: center;">
                        <img src="${urlImagen}" alt="${servicio.titulo}" style="width:100%; max-width:200px; border-radius: 8px; display: block; margin: 0 auto; margin-bottom: 15px;">
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

// 3. EJECUTAR AL CARGAR
document.addEventListener('DOMContentLoaded', () => {
    cargarServiciosDesdeCMS();
});

// 4. FUNCIÓN PARA VER MÁS (MODAL)
function verMas(id) {
    fetch(`http://localhost:3000/api/servicios/${id}`)
        .then(res => res.json())
        .then(servicio => {
            let modal = document.getElementById('detalle-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'detalle-modal';
                document.body.appendChild(modal);
            }

            // --- LÓGICA MEJORADA PARA EXTRAER EL TEXTO ---
            let detallesHTML = "";
            if (servicio.detalles && servicio.detalles.root && servicio.detalles.root.children) {
                servicio.detalles.root.children.forEach(block => {
                    if (block.children) {
                        let parrafoTexto = block.children
                            .map(child => child.text ? child.text : "")
                            .join(""); // Unimos el texto del mismo bloque
                        
                        if (parrafoTexto.trim() !== "") {
                            // Usamos margin-bottom para separar párrafos visualmente
                            detallesHTML += `<p style="margin-bottom: 15px; display: block;">${parrafoTexto}</p>`;
                        }
                    }
                });
            } else {
                detallesHTML = "<p>No hay detalles adicionales disponibles.</p>";
            }

            // Aplicamos los estilos al modal
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
                maxWidth: '600px', 
                width: '90%', 
                border: '2px solid #007bff',
                // Ajustes para el crecimiento vertical y scroll
                maxHeight: '85vh', 
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                boxSizing: 'border-box'
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

            // Fondo oscuro (Overlay)
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
            
            // Auto-scroll al inicio del modal al abrirse
            modal.scrollTop = 0;
        })
        .catch(err => console.error("Error cargando detalles:", err));
}