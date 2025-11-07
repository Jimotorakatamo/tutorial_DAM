// ============================================
// JAVASCRIPT PARA TUTORIALES MÓVILES
// ============================================

// Funcionalidad del menú lateral
(function() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuClose = document.getElementById('mobile-menu-close');
    const sideMenu = document.getElementById('mobile-side-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu-list a');
    
    function openMenu() {
        sideMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuBtn) {
        menuBtn.addEventListener('click', openMenu);
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Cerrar menú al hacer click en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            closeMenu();
            
            // Marcar como activo
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
})();

// Funcionalidad de copiar código
(function() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const codeId = this.getAttribute('data-copy');
            const codeElement = document.getElementById(codeId);
            
            if (codeElement) {
                const text = codeElement.textContent;
                
                // Copiar al portapapeles
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(() => {
                        // Feedback visual
                        const originalHTML = this.innerHTML;
                        this.innerHTML = '<i class="fa-solid fa-check"></i> Copiado';
                        this.style.background = 'rgba(34, 197, 94, 0.3)';
                        this.style.color = '#22c55e';
                        
                        setTimeout(() => {
                            this.innerHTML = originalHTML;
                            this.style.background = '';
                            this.style.color = '';
                        }, 2000);
                    });
                } else {
                    // Fallback para navegadores antiguos
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    
                    // Feedback visual
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fa-solid fa-check"></i> Copiado';
                    
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                    }, 2000);
                }
            }
        });
    });
})();

// Destacar sección activa en el menú al hacer scroll
(function() {
    const sections = document.querySelectorAll('.tutorial-section[id]');
    const menuLinks = document.querySelectorAll('.mobile-menu-list a');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Ejecutar al cargar
})();

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70; // Altura del navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Prevenir que los bloques de código se escapen del viewport
(function() {
    const codeBlocks = document.querySelectorAll('.code-block pre');
    
    codeBlocks.forEach(block => {
        block.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        }, { passive: true });
    });
})();

// Syntax Highlighting automático
(function() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    
    codeBlocks.forEach(code => {
        let html = code.innerHTML;
        const page = document.body.getAttribute('data-page');
        
        // HTML/XML highlighting
        if (page === 'html' || page === 'xml') {
            // Comentarios
            html = html.replace(/(&lt;!--.*?--&gt;)/g, '<span class="comment">$1</span>');
            
            // Etiquetas
            html = html.replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="tag">$2</span>');
            
            // Atributos
            html = html.replace(/([\w-]+)=/g, '<span class="attribute">$1</span>=');
            
            // Strings
            html = html.replace(/="([^"]*)"/g, '="<span class="string">$1</span>"');
            html = html.replace(/='([^']*)'/g, "='<span class=\"string\">$1</span>'");
        }
        
        // CSS highlighting
        if (page === 'css') {
            // Comentarios
            html = html.replace(/(\/\*.*?\*\/)/g, '<span class="comment">$1</span>');
            
            // Selectores
            html = html.replace(/^([.#]?[\w-]+)(?=\s*\{)/gm, '<span class="selector">$1</span>');
            
            // Propiedades
            html = html.replace(/([\w-]+)(?=\s*:)/g, '<span class="property">$1</span>');
            
            // Valores
            html = html.replace(/:\s*([^;{}]+)/g, ': <span class="value">$1</span>');
            
            // Números y unidades
            html = html.replace(/(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw)?)/g, '<span class="number">$1</span>');
        }
        
        // JavaScript highlighting
        if (page === 'js') {
            // Comentarios
            html = html.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
            html = html.replace(/(\/\*.*?\*\/)/g, '<span class="comment">$1</span>');
            
            // Palabras clave
            const jsKeywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'new', 'this', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'throw'];
            jsKeywords.forEach(keyword => {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
                html = html.replace(regex, '<span class="keyword">$1</span>');
            });
            
            // Strings
            html = html.replace(/"([^"]*)"/g, '"<span class="string">$1</span>"');
            html = html.replace(/'([^']*)'/g, "'<span class=\"string\">$1</span>'");
            html = html.replace(/`([^`]*)`/g, '`<span class="string">$1</span>`');
            
            // Números
            html = html.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="number">$1</span>');
            
            // Funciones
            html = html.replace(/\b(\w+)(?=\()/g, '<span class="function">$1</span>');
        }
        
        // Java highlighting
        if (page === 'java') {
            // Comentarios
            html = html.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
            html = html.replace(/(\/\*.*?\*\/)/gs, '<span class="comment">$1</span>');
            
            // Anotaciones
            html = html.replace(/(@\w+)/g, '<span class="annotation">$1</span>');
            
            // Palabras clave
            const javaKeywords = ['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'static', 'final', 'void', 'return', 'new', 'this', 'if', 'else', 'for', 'while', 'try', 'catch', 'throw', 'import', 'package'];
            javaKeywords.forEach(keyword => {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
                html = html.replace(regex, '<span class="keyword">$1</span>');
            });
            
            // Tipos
            const javaTypes = ['int', 'String', 'boolean', 'double', 'float', 'long', 'List', 'Map', 'Set', 'Optional', 'Stream'];
            javaTypes.forEach(type => {
                const regex = new RegExp(`\\b(${type})\\b`, 'g');
                html = html.replace(regex, '<span class="class">$1</span>');
            });
            
            // Strings
            html = html.replace(/"([^"]*)"/g, '"<span class="string">$1</span>"');
            
            // Números
            html = html.replace(/\b(\d+(?:\.\d+)?[fFdDlL]?)\b/g, '<span class="number">$1</span>');
        }
        
        // Python highlighting
        if (page === 'python') {
            // Comentarios
            html = html.replace(/(#.*$)/gm, '<span class="comment">$1</span>');
            
            // Decoradores
            html = html.replace(/(@\w+)/g, '<span class="decorator">$1</span>');
            
            // Palabras clave
            const pythonKeywords = ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'async', 'await', 'lambda', 'yield'];
            pythonKeywords.forEach(keyword => {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
                html = html.replace(regex, '<span class="keyword">$1</span>');
            });
            
            // Funciones builtin
            const pythonBuiltins = ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'open', 'input', 'type', 'isinstance', 'super'];
            pythonBuiltins.forEach(builtin => {
                const regex = new RegExp(`\\b(${builtin})(?=\\()`, 'g');
                html = html.replace(regex, '<span class="builtin">$1</span>');
            });
            
            // Strings
            html = html.replace(/"([^"]*)"/g, '"<span class="string">$1</span>"');
            html = html.replace(/'([^']*)'/g, "'<span class=\"string\">$1</span>'");
            
            // Números
            html = html.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="number">$1</span>');
        }
        
        code.innerHTML = html;
    });
})();

// Theme toggle functionality
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        if (themeToggle) {
            themeToggle.checked = savedTheme === 'dark';
        }
    }
    
    // Cambiar tema
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
})();

console.log('📚 Tutorial móvil cargado correctamente');
