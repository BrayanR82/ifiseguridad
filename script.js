/**
 * IFI Seguridad - Frontend Logic
 */

// Manejo de la redirección de Stripe
async function buyProduct(itemId) {
    const button = event.target;
    button.disabled = true;
    button.innerText = "Cargando...";

    try {
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId: itemId }),
        });

        const session = await response.json();

        if (session.url) {
            window.location.href = session.url;
        } else {
            alert("Error al conectar con Stripe. Revisa la consola del servidor.");
            button.disabled = false;
            button.innerText = "Comprar Ahora";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al procesar el pago.");
        button.disabled = false;
        button.innerText = "Comprar Ahora";
    }
}

// Scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});