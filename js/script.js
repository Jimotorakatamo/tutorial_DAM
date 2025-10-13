// This file contains JavaScript functions for interactivity on the HTML tutorial page.

document.addEventListener('DOMContentLoaded', () => {

    let maintenanceElements = null;
    let maintenanceTriggered = false;

    const ensureMaintenanceOverlay = () => {
        if (maintenanceElements) {
            return maintenanceElements;
        }

        const overlay = document.createElement('div');
        overlay.className = 'maintenance-overlay';
        overlay.setAttribute('role', 'alertdialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = `
            <div class="maintenance-card">
                <div class="maintenance-icon"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div>
                <h2>Estamos mejorando la web</h2>
                <p class="maintenance-message">En unos instantes volverá la magia.</p>
                <p class="maintenance-detail" data-maintenance-detail hidden></p>
                <div class="maintenance-actions">
                    <button type="button" class="maintenance-reload">
                        <i class="fa-solid fa-rotate-right"></i>
                        Reintentar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const detailNode = overlay.querySelector('[data-maintenance-detail]');
        const reloadBtn = overlay.querySelector('.maintenance-reload');
        if (reloadBtn) {
            reloadBtn.addEventListener('click', () => window.location.reload());
        }

        maintenanceElements = { overlay, detailNode };
        return maintenanceElements;
    };

    const showMaintenanceNotice = (detail) => {
        const { overlay, detailNode } = ensureMaintenanceOverlay();

        if (detailNode) {
            if (detail) {
                detailNode.textContent = detail;
                detailNode.hidden = false;
            } else {
                detailNode.textContent = '';
                detailNode.hidden = true;
            }
        }

        overlay.setAttribute('aria-hidden', 'false');
        overlay.classList.add('is-visible');
        document.body.classList.add('maintenance-active');
        maintenanceTriggered = true;
    };

    const registerMaintenanceListeners = () => {
        window.addEventListener('error', (event) => {
            if (maintenanceTriggered) {
                return;
            }
            const message = event?.message ? `Error: ${event.message}` : 'Ocurrió un error inesperado.';
            showMaintenanceNotice(message);
        });

        window.addEventListener('unhandledrejection', (event) => {
            if (maintenanceTriggered) {
                return;
            }
            const reason = event?.reason;
            const detail = typeof reason === 'string' ? reason : reason?.message;
            showMaintenanceNotice(detail ? `Detalle: ${detail}` : 'Detectamos un problema al cargar la página.');
        });

        window.addEventListener('offline', () => {
            const detail = navigator.onLine ? '' : 'Parece que no hay conexión a internet.';
            showMaintenanceNotice(detail);
        });
    };

    registerMaintenanceListeners();

    window.triggerMaintenanceOverlay = (detail) => {
        showMaintenanceNotice(detail || 'Modo debug: overlay forzado.');
    };

    const maintenanceParam = new URLSearchParams(window.location.search);
    if (maintenanceParam.has('maintenance')) {
        const detailValue = maintenanceParam.get('maintenance');
        const detailText = detailValue && detailValue !== '1' ? detailValue : 'Modo debug: overlay forzado.';
        showMaintenanceNotice(detailText);
    }

    const versionTargets = document.querySelectorAll('[data-version]');
    if (versionTargets.length) {
        const tryPaths = ['VERSION', '../VERSION', '../../VERSION'];
        const loadVersion = (paths) => {
            if (!paths.length) {
                versionTargets.forEach(node => node.textContent = 'v?.?.?');
                return;
            }
            const [current, ...rest] = paths;
            fetch(current)
                .then(resp => resp.ok ? resp.text() : Promise.reject(new Error(`HTTP ${resp.status}`)))
                .then(text => {
                    const version = text.trim();
                    versionTargets.forEach(node => node.textContent = version);
                })
                .catch((error) => {
                    if (!rest.length) {
                        versionTargets.forEach(node => node.textContent = 'v?.?.?');
                        const detail = error?.message ? `Motivo: ${error.message}` : 'No pudimos sincronizar la versión del sitio.';
                        showMaintenanceNotice(detail);
                        return;
                    }
                    loadVersion(rest);
                });
        };
        loadVersion(tryPaths);
    }

    // Aplicar la animación de entrada al cuerpo de la página
    document.body.classList.add('fade-in');
    const releaseTransition = () => document.documentElement.classList.remove('transition-init');
    if (window.requestAnimationFrame) {
        requestAnimationFrame(() => requestAnimationFrame(releaseTransition));
    } else {
        releaseTransition();
    }

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

    // --- LÓGICA DEL MODO OSCURO ---
    const themeToggle = document.getElementById('theme-toggle');
    const systemMedia = window.matchMedia('(prefers-color-scheme: dark)');
    let storedTheme = localStorage.getItem('theme');
    let userInteracted = Boolean(storedTheme);

    const resolveTheme = () => storedTheme || (systemMedia.matches ? 'dark' : 'light');

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeToggle) {
            themeToggle.checked = theme === 'dark';
        }
    };

    applyTheme(resolveTheme());

    const persistTheme = (theme) => {
        localStorage.setItem('theme', theme);
        storedTheme = theme;
    };

    // Verificación: ¿Existe el interruptor?
    if (themeToggle) {
        // Añadir el listener para el evento 'change'
        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            applyTheme(newTheme);
            persistTheme(newTheme);
            userInteracted = true;
        });

    } else {
        // Si el interruptor no se encuentra, mostrar un error claro en la consola.
        console.error("ERROR CRÍTICO: No se pudo encontrar el elemento con id='theme-toggle'. Verifica tu archivo index.html.");
    }

    if (!userInteracted) {
        systemMedia.addEventListener('change', (event) => {
            if (userInteracted) {
                return;
            }
            const newTheme = event.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            console.log(`Tema ajustado según el sistema: ${newTheme}`);
        });
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
    const sections = [...document.querySelectorAll('main section')].filter(section => Boolean(section.id));
    const navLinks = document.querySelectorAll('.nav-links li a');
    const pageNavLinks = [...document.querySelectorAll('.page-nav ul li a')];

    const activatePageNavLink = (sectionId) => {
        if (!sectionId) {
            return;
        }
        const targetHref = `#${sectionId}`;
        let hasMatch = false;
        pageNavLinks.forEach(link => {
            const match = link.getAttribute('href') === targetHref;
            link.classList.toggle('active', match);
            if (match) {
                hasMatch = true;
            }
        });

        if (!hasMatch && pageNavLinks.length) {
            pageNavLinks[0].classList.add('active');
        }
    };

    // Solo ejecutar el observador si estamos en una página de contenido (con secciones y enlaces de navegación)
    if (sections.length > 0 && pageNavLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
                    activatePageNavLink(entry.target.id);
                }
            });
        }, {
            rootMargin: '-30% 0px -40% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });
        sections.forEach(section => observer.observe(section));

        const initialSection = window.location.hash ? window.location.hash.substring(1) : sections[0]?.id;
        activatePageNavLink(initialSection);
        pageNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                const id = link.getAttribute('href').substring(1);
                activatePageNavLink(id);
            });
        });
    }

    // --- LÓGICA DE COLAPSADO DE BARRAS LATERALES ---
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const pageNav = document.querySelector('.page-nav');
    const pageNavToggle = document.querySelector('.page-nav-toggle');

    const LAYOUT_STORAGE_KEY = 'layout-preferences-v1';

    const loadLayoutState = () => {
        try {
            const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
            if (!raw) {
                return {};
            }
            const parsed = JSON.parse(raw);
            return typeof parsed === 'object' && parsed ? parsed : {};
        } catch (error) {
            console.warn('No se pudo cargar el estado de la maquetación:', error);
            return {};
        }
    };

    const layoutState = loadLayoutState();

    const persistLayoutState = () => {
        try {
            localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layoutState));
        } catch (error) {
            console.warn('No se pudo guardar el estado de la maquetación:', error);
        }
    };

    const getPersistedCollapse = (key) => (typeof layoutState[key] === 'boolean' ? layoutState[key] : false);

    const updateLayoutFlags = () => {
        if (!document.body) {
            return;
        }
        const sidebarIsCollapsed = sidebar?.classList.contains('collapsed');
        const pageNavIsCollapsed = pageNav?.classList.contains('collapsed');
        document.body.classList.toggle('sidebar-collapsed', Boolean(sidebarIsCollapsed));
        document.body.classList.toggle('page-nav-collapsed', Boolean(pageNavIsCollapsed));
    };

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

    const mobileNavMedia = window.matchMedia('(max-width: 768px)');

    const applyResponsiveNavState = () => {
        const isMobile = mobileNavMedia.matches;

        if (sidebar) {
            if (sidebarToggle) {
                sidebarToggle.disabled = isMobile;
                sidebarToggle.setAttribute('aria-disabled', String(isMobile));
            }
            const collapseSidebar = isMobile ? true : getPersistedCollapse('sidebarCollapsed');
            sidebar.classList.toggle('collapsed', collapseSidebar);
            syncToggleState(sidebarToggle, !collapseSidebar);
        }

        if (pageNav) {
            if (pageNavToggle) {
                pageNavToggle.disabled = isMobile;
                pageNavToggle.setAttribute('aria-disabled', String(isMobile));
            }
            const collapsePageNav = isMobile ? true : getPersistedCollapse('pageNavCollapsed');
            pageNav.classList.toggle('collapsed', collapsePageNav);
            syncToggleState(pageNavToggle, !collapsePageNav);
        }

        updateLayoutFlags();
    };

    applyResponsiveNavState();
    mobileNavMedia.addEventListener('change', applyResponsiveNavState);

    if (sidebar && sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            if (mobileNavMedia.matches || sidebarToggle.disabled) {
                syncToggleState(sidebarToggle, false);
                return;
            }
            const collapsed = sidebar.classList.toggle('collapsed');
            layoutState.sidebarCollapsed = collapsed;
            persistLayoutState();
            syncToggleState(sidebarToggle, !collapsed);
            updateLayoutFlags();
        });
    }

    if (pageNav && pageNavToggle) {
        pageNavToggle.addEventListener('click', () => {
            if (mobileNavMedia.matches || pageNavToggle.disabled) {
                syncToggleState(pageNavToggle, false);
                return;
            }
            const collapsed = pageNav.classList.toggle('collapsed');
            layoutState.pageNavCollapsed = collapsed;
            persistLayoutState();
            syncToggleState(pageNavToggle, !collapsed);
            updateLayoutFlags();
        });
    }

    updateLayoutFlags();
});