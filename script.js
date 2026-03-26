document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS ---
    const loader = document.getElementById('loader');
    const mainUi = document.getElementById('main-ui');
    const sideMenu = document.getElementById('side-menu');
    const openBtn = document.getElementById('open-menu');
    const closeBtn = document.querySelector('.close-btn');
    const nameText = document.getElementById('dynamic-name');
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    // 1. PANTALLA DE CARGA
    setTimeout(() => {
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                if(mainUi) mainUi.classList.remove('hidden');
                document.body.style.overflow = 'auto';
            }, 1000);
        }
    }, 10000);

    // 2. MENÚ LATERAL
    openBtn?.addEventListener('click', () => sideMenu?.classList.add('active'));
    closeBtn?.addEventListener('click', () => sideMenu?.classList.remove('active'));
    
    window.addEventListener('click', (e) => {
        if (e.target === sideMenu) sideMenu.classList.remove('active');
    });

    // 3. CAMBIO DE NOMBRE
    nameText?.addEventListener('mouseover', () => nameText.textContent = 'Sophi Barcos');
    nameText?.addEventListener('mouseout', () => nameText.textContent = 'Luizabeth Contreras');

    // 4. CURSOR PERSONALIZADO
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        if(cursorDot && cursorOutline) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }
    });

    // Elementos Interactivos (Corregido el salto de línea)
    const interactivos = document.querySelectorAll('button, a, .identity-item, .service-item');
    interactivos.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursorOutline?.classList.add("cursor-hover");
            if(cursorDot) cursorDot.style.backgroundColor = "#ffc0cb";
        });
        el.addEventListener("mouseleave", () => {
            cursorOutline?.classList.remove("cursor-hover");
            if(cursorDot) cursorDot.style.backgroundColor = "#8a0303";
        });
    });

    // 5. OBSERVERS (Animaciones al hacer scroll)
    const observerOptions = { threshold: 0.2 };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translate(0,0) scale(1)";
            }
        });
    }, observerOptions);

    // Aplicar a diferentes elementos
    document.querySelectorAll('.tool-item, .about-content, .identity-item, .stack-item').forEach(el => {
        // Estilos iniciales
        el.style.opacity = "0";
        el.style.transition = "all 0.8s ease-out";
        revealObserver.observe(el);
    });

    // 6. BARRAS DE PROGRESO (Lógica mejorada)
    const progressSection = document.querySelector('.progress-section');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.progress-fill').forEach(fill => {
                    const finalWidth = fill.dataset.width || fill.style.width; 
                    fill.style.width = '0';
                    setTimeout(() => fill.style.width = finalWidth, 100);
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    if (progressSection) progressObserver.observe(progressSection);

    // 7. COMPARTIR
    const shareBtn = document.getElementById('share-btn');
    const shareMsg = document.getElementById('share-msg');
    shareBtn?.addEventListener('click', async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Luizabeth Sophia - Portfolio',
                    text: 'Mira este mundo digital gótico y soñador.',
                    url: window.location.href
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                shareMsg?.classList.add('show');
                setTimeout(() => shareMsg?.classList.remove('show'), 3000);
            }
        } catch (err) { console.log('Error:', err); }
    });
});

// Función global (fuera del DOMContentLoaded si se llama desde el HTML)
function toggleCard(id) {
    const allCards = document.querySelectorAll('.service-details');
    const targetCard = document.getElementById('card-' + id);
    allCards.forEach(card => {
        if (card.id !== 'card-' + id) card.classList.remove('active');
    });
    targetCard?.classList.toggle('active');
}