// Detección de dispositivo móvil y redirección
(function() {
    // Verificar si ya estamos en la versión móvil
    if (window.location.pathname.includes('/mobile/')) {
        return; // No ejecutar si ya estamos en mobile
    }
    
    // Verificar si el usuario quiere forzar la versión desktop
    const urlParams = new URLSearchParams(window.location.search);
    const forceDesktop = urlParams.get('desktop') === 'true';
    
    if (forceDesktop) {
        // Guardar preferencia en sessionStorage
        sessionStorage.setItem('forceDesktop', 'true');
        return;
    }
    
    // Verificar si hay preferencia guardada de desktop
    if (sessionStorage.getItem('forceDesktop') === 'true') {
        return;
    }
    
    // Función para detectar si es un dispositivo móvil
    function isMobileDevice() {
        // Verificar el user agent
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Lista de patrones para detectar móviles (excluir tablets grandes en modo landscape)
        const mobilePatterns = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i,
            /Mobile/i
        ];
        
        // Verificar si coincide con algún patrón móvil
        const isMobile = mobilePatterns.some(pattern => userAgent.match(pattern));
        
        // También verificar el ancho de pantalla (solo pantallas realmente pequeñas)
        const isSmallScreen = window.innerWidth <= 768 && window.innerHeight <= 1024;
        
        // Detectar si es tablet en landscape (no redirigir)
        const isTabletLandscape = /iPad/i.test(userAgent) && window.innerWidth > window.innerHeight;
        
        return (isMobile || isSmallScreen) && !isTabletLandscape;
    }
    
    // Función para obtener la URL móvil correspondiente
    function getMobileUrl() {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/');
        const fileName = pathParts[pathParts.length - 1] || 'index.html';
        
        // Obtener el directorio base
        const baseDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        
        // Si estamos en la raíz o index.html
        if (fileName === '' || fileName === 'index.html' || currentPath.endsWith('/')) {
            return baseDir + 'mobile/index.html';
        }
        
        // Para otras páginas, construir la ruta móvil
        return baseDir + 'mobile/' + fileName;
    }
    
    // Ejecutar la redirección si es necesario
    if (isMobileDevice()) {
        const mobileUrl = getMobileUrl();
        // Redirigir inmediatamente
        window.location.replace(mobileUrl);
    }
})();
