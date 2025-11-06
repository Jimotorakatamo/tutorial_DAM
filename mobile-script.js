// ============================================
// JAVASCRIPT MÓVIL - Tutorial DAM
// ============================================

// Tema (Dark/Light Mode)
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    if (!themeToggle) return; // Salir si no existe el elemento
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.checked = true;
        }
    }
    
    // Cambiar tema
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
})();

// Cargar versión desde VERSION-MOBILE file
(function() {
    const versionElements = document.querySelectorAll('[data-version]');
    
    if (versionElements.length === 0) return;
    
    // Usar versión hardcodeada como fallback inmediato
    versionElements.forEach(el => {
        el.textContent = '2.0.0';
    });
    
    // Intentar cargar desde archivo (opcional)
    fetch('VERSION-MOBILE')
        .then(response => {
            if (response.ok) return response.text();
            throw new Error('VERSION-MOBILE file not found');
        })
        .then(version => {
            versionElements.forEach(el => {
                el.textContent = version.trim();
            });
        })
        .catch(() => {
            // Silenciosamente usar el valor por defecto ya establecido
        });
})();

// Animación suave al hacer scroll (si hay contenido largo)
(function() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (anchors.length === 0) return;
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
})();

// Feedback táctil mejorado para las tarjetas
(function() {
    const cards = document.querySelectorAll('.mobile-card');
    if (cards.length === 0) return;
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
})();

// Prevenir zoom accidental con doble tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Service Worker para funcionamiento offline (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Puedes descomentar esto si quieres funcionalidad offline
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Detectar orientación del dispositivo
window.addEventListener('orientationchange', function() {
    // Recargar estilos si es necesario
    document.body.style.height = window.innerHeight + 'px';
});

// Ajustar altura de viewport en iOS
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);

console.log('📱 Versión móvil del Tutorial DAM cargada');
