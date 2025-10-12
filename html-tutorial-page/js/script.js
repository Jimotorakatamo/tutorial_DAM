// This file contains JavaScript functions for interactivity on the HTML tutorial page.

document.addEventListener('DOMContentLoaded', () => {

    // Aplicar la animación de entrada al cuerpo de la página
    document.body.classList.add('fade-in');

    // --- LÓGICA DE TRANSICIÓN DE PÁGINA ---
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        // Solo afectar a enlaces internos que no sean de ancla
        const url = new URL(link.href, window.location.origin);
        if (url.hostname === window.location.hostname && !link.href.includes('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevenir la navegación inmediata
                const destination = this.href;

                // Aplicar la animación de salida
                document.body.classList.remove('fade-in');
                document.body.classList.add('fade-out');

                // Esperar a que termine la animación para navegar
                setTimeout(() => {
                    window.location.href = destination;
                }, 500); // Coincide con la duración de la animación
            });
        }
    });


    console.log("El DOM está completamente cargado. Iniciando script.");

    // --- LÓGICA DEL MODO OSCURO ---
    const themeToggle = document.getElementById('theme-toggle');

    // Verificación: ¿Existe el interruptor?
    if (themeToggle) {
        console.log("Interruptor 'theme-toggle' encontrado.");

        // Cargar el tema guardado o usar 'light' por defecto
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }

        // Añadir el listener para el evento 'change'
        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            console.log(`Tema cambiado a: ${newTheme}`);
        });

    } else {
        // Si el interruptor no se encuentra, mostrar un error claro en la consola.
        console.error("ERROR CRÍTICO: No se pudo encontrar el elemento con id='theme-toggle'. Verifica tu archivo index.html.");
    }

    // --- LÓGICA DE COPIAR CÓDIGO (sin cambios) ---
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pre = button.closest('.code-container').querySelector('pre');
            if (pre) {
                navigator.clipboard.writeText(pre.innerText).then(() => {
                    const originalIcon = button.innerHTML;
                    button.innerHTML = '<i class="fa-solid fa-check"></i> Copiado';
                    button.classList.add('copied');
                    setTimeout(() => {
                        button.innerHTML = originalIcon;
                        button.classList.remove('copied');
                    }, 2000);
                });
            }
        });
    });

    // --- LÓGICA DE SCROLLSPY (adaptada para ser más robusta) ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const pageNavLinks = document.querySelectorAll('.page-nav ul li a');

    // Solo ejecutar el observador si estamos en una página de contenido (con secciones y enlaces de navegación)
    if (sections.length > 0 && pageNavLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    
                    // Resaltar menú de página
                    pageNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.4 });
        sections.forEach(section => observer.observe(section));
    }

    // --- LÓGICA DE COLAPSADO DE BARRAS LATERALES ---
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const pageNav = document.querySelector('.page-nav');
    const pageNavToggle = document.querySelector('.page-nav-toggle');

    const syncToggleState = (toggleBtn, isExpanded) => {
        if (!toggleBtn) return;
        toggleBtn.setAttribute('aria-expanded', String(isExpanded));
        const icon = toggleBtn.querySelector('i');
        if (!icon) return;

        icon.classList.remove('fa-angles-left', 'fa-angles-right');
        const isSidebarToggle = toggleBtn.classList.contains('sidebar-toggle');
        if (isSidebarToggle) {
            icon.classList.add(isExpanded ? 'fa-angles-left' : 'fa-angles-right');
        } else {
            icon.classList.add(isExpanded ? 'fa-angles-right' : 'fa-angles-left');
        }
    };

    if (sidebar && sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            const collapsed = sidebar.classList.toggle('collapsed');
            syncToggleState(sidebarToggle, !collapsed);
        });
    }

    if (pageNav && pageNavToggle) {
        pageNavToggle.addEventListener('click', () => {
            const collapsed = pageNav.classList.toggle('collapsed');
            syncToggleState(pageNavToggle, !collapsed);
        });
    }
});