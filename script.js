// This file contains JavaScript functions for interactivity on the HTML tutorial page.

document.addEventListener('DOMContentLoaded', () => {

    const motionMedia = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const lowSpecSignals = (() => {
        const cores = navigator.hardwareConcurrency || 0;
        const memory = navigator.deviceMemory || 0;
        const slowCpu = cores > 0 && cores <= 4;
        const limitedMemory = memory > 0 && memory <= 4;
        const slowConnection = typeof connection?.effectiveType === 'string' && /^(slow-)?2g$/.test(connection.effectiveType);
        return slowCpu || limitedMemory || slowConnection;
    })();

    const refreshEffectBudget = () => {
        const prefersReducedMotion = Boolean(motionMedia?.matches);
        const shouldReduce = prefersReducedMotion || lowSpecSignals;
        document.documentElement.classList.toggle('reduced-effects', shouldReduce);
    };

    if (motionMedia?.addEventListener) {
        motionMedia.addEventListener('change', refreshEffectBudget);
    } else if (motionMedia?.addListener) {
        motionMedia.addListener(refreshEffectBudget);
    }

    refreshEffectBudget();

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
        const tryPaths = ['VERSION-DESKTOP', '../VERSION-DESKTOP', '../../VERSION-DESKTOP'];
        const loadVersion = (paths) => {
            if (!paths.length) {
                versionTargets.forEach(node => node.textContent = 'v2.0.0');
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
                        versionTargets.forEach(node => node.textContent = 'v2.0.0');
                        return;
                    }
                    loadVersion(rest);
                });
        };
        loadVersion(tryPaths);
    }

    // Aplicar la animación de entrada al cuerpo de la página
    document.body.classList.add('fade-in');
        const resetPageFade = () => {
            document.body.classList.remove('fade-out');
            document.body.classList.add('fade-in');
        };
        window.addEventListener('pageshow', (event) => {
            if (event.persisted || document.body.classList.contains('fade-out')) {
                resetPageFade();
            }
        });
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
                link.setAttribute('aria-current', 'location');
                hasMatch = true;
            } else {
                link.removeAttribute('aria-current');
            }
        });

        if (!hasMatch && pageNavLinks.length && sections.length) {
            pageNavLinks[0].classList.add('active');
            pageNavLinks[0].setAttribute('aria-current', 'location');
        }
    };

    const sectionVisibility = new Map();

    const getDominantSection = () => {
        // Primero intentar obtener la sección más visible
        if (sectionVisibility.size > 0) {
            let dominantId = null;
            let dominantRatio = -1;
            sectionVisibility.forEach((ratio, sectionId) => {
                if (ratio > dominantRatio) {
                    dominantRatio = ratio;
                    dominantId = sectionId;
                }
            });
            if (dominantId && dominantRatio > 0.1) {
                return dominantId;
            }
        }

        // Si no hay sección claramente visible, buscar la más cercana al viewport superior
        let closestId = null;
        let smallestDistance = Number.POSITIVE_INFINITY;
        const referenceLine = window.innerHeight * 0.15;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Considerar solo secciones que están al menos parcialmente visibles
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const distance = Math.abs(rect.top - referenceLine);
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    closestId = section.id;
                }
            }
        });
        
        // Si no encontramos ninguna sección visible, buscar la última que pasamos
        if (!closestId) {
            for (let i = sections.length - 1; i >= 0; i--) {
                const rect = sections[i].getBoundingClientRect();
                if (rect.top < referenceLine) {
                    closestId = sections[i].id;
                    break;
                }
            }
        }
        
        return closestId || sections[0]?.id;
    };

    // Solo ejecutar el observador si estamos en una página de contenido (con secciones y enlaces de navegación)
    if (sections.length > 0 && pageNavLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sectionVisibility.set(entry.target.id, entry.intersectionRatio);
                } else {
                    sectionVisibility.delete(entry.target.id);
                }
            });

            const dominantSection = getDominantSection();
            if (dominantSection) {
                activatePageNavLink(dominantSection);
            }
        }, {
            rootMargin: '-10% 0px -50% 0px',
            threshold: [0, 0.05, 0.1, 0.15, 0.25, 0.35, 0.5, 0.65, 0.75, 0.85, 1]
        });
        sections.forEach(section => observer.observe(section));

        // Activar sección inicial
        const initialSection = window.location.hash ? window.location.hash.substring(1) : sections[0]?.id;
        if (initialSection) {
            activatePageNavLink(initialSection);
        }
        
        // Manejar clics en enlaces del menú lateral
        pageNavLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const id = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(id);
                if (targetSection) {
                    // Desactivar temporalmente el observer durante el scroll suave
                    sections.forEach(section => observer.unobserve(section));
                    
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                    
                    // Activar inmediatamente el enlace clicado
                    activatePageNavLink(id);
                    history.replaceState(null, '', `#${id}`);
                    
                    // Reactivar el observer después del scroll
                    setTimeout(() => {
                        sections.forEach(section => observer.observe(section));
                    }, 800);
                }
            });
        });

        // Sincronizar cuando cambie el hash manualmente
        window.addEventListener('hashchange', () => {
            const targetId = window.location.hash.replace('#', '');
            if (targetId) {
                activatePageNavLink(targetId);
            }
        });
        
        // Sincronizar al hacer scroll (backup por si el IntersectionObserver falla)
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const currentSection = getDominantSection();
                if (currentSection) {
                    activatePageNavLink(currentSection);
                }
            }, 100);
        }, { passive: true });
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

    // Aplicar estado guardado al cargar
    if (sidebar) {
        const collapseSidebar = getPersistedCollapse('sidebarCollapsed');
        sidebar.classList.toggle('collapsed', collapseSidebar);
        syncToggleState(sidebarToggle, !collapseSidebar);
    }

    if (pageNav) {
        const collapsePageNav = getPersistedCollapse('pageNavCollapsed');
        pageNav.classList.toggle('collapsed', collapsePageNav);
        syncToggleState(pageNavToggle, !collapsePageNav);
    }

    updateLayoutFlags();

    if (sidebar && sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            const collapsed = sidebar.classList.toggle('collapsed');
            layoutState.sidebarCollapsed = collapsed;
            persistLayoutState();
            syncToggleState(sidebarToggle, !collapsed);
            updateLayoutFlags();
        });
    }

    if (pageNav && pageNavToggle) {
        pageNavToggle.addEventListener('click', () => {
            const collapsed = pageNav.classList.toggle('collapsed');
            layoutState.pageNavCollapsed = collapsed;
            persistLayoutState();
            syncToggleState(pageNavToggle, !collapsed);
            updateLayoutFlags();
        });
    }
});