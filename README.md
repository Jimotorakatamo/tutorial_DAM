# tutorial_DAM

**Current version:** `v2.0.0`

## Overview
Este proyecto recopila tutoriales modernos e interactivos sobre las principales tecnologías de desarrollo web: HTML, CSS, JavaScript, XML, Java y Python. Cada página combina contenido educativo, ejemplos de código y componentes UI estilizados con gradientes animados.

## Características principales
- Tarjetas temáticas con animaciones y modo claro/oscuro persistente.
- Tutoriales independientes con navegación lateral, índice contextual y ejemplos copiables.
- Contenido accesible: atajos ARIA, contraste reforzado y soporte para preferencias de movimiento reducido.
- Changelog visual con versión dinámica tomada del archivo `VERSION`.

## Tecnologías utilizadas
| Capa | Herramientas |
| --- | --- |
| Maquetación | HTML5 semántico, ARIA landmarks |
| Estilos | CSS3 modular con variables personalizadas, gradientes animados, `prefers-reduced-motion` |
| Interactividad | JavaScript ES6 (fetch API, `localStorage`, IntersectionObserver) |
| Documentación | Markdown (`README.md`, `CHANGELOG.md`) y changelog web |
| Formateo de código | highlight.js para resaltar ejemplos |

## Estructura del proyecto
```
html-tutorial-page/
├── desktop/                  # Versión de escritorio
│   ├── index.html           # Landing page con tarjetas de acceso a cada tutorial
│   ├── css/
│   │   └── style.css        # Hoja de estilos global con temas y gradientes animados
│   ├── js/
│   │   └── script.js        # Interactividad (tema oscuro, copiado, scrollspy, toggles)
│   ├── assets/              # Recursos (imágenes, iconos, etc.)
│   └── *.html              # Tutoriales individuales por tecnología
├── mobile/                   # Versión móvil
│   ├── index.html           # Página principal móvil
│   ├── css/
│   │   ├── mobile-style.css         # Estilos base para móvil
│   │   └── tutorial-mobile.css      # Estilos de tutoriales con tematización
│   ├── js/
│   │   ├── mobile-script.js         # Funcionalidad básica
│   │   └── tutorial-mobile.js       # Resaltado de sintaxis y navegación
│   └── *.html              # Tutoriales móviles optimizados
├── README.md                 # Este documento
├── CHANGELOG.md              # Historial de cambios en Markdown
└── VERSION                   # Versión global del sitio
```

### Características de la versión móvil
- **Botones flotantes**: Acceso rápido a versión desktop y changelog
- **Resaltado de sintaxis**: 18 clases de colores para código (keywords, strings, comments, etc.)
- **Tematización por página**: Cada tutorial tiene colores y gradientes únicos
- **Info-cards**: Notas, tips e información importante con estilos distintivos
```

## Uso
1. Abre `index.html` en tu navegador preferido.
2. Navega usando la barra lateral o las tarjetas del índice para acceder a cada tutorial.
3. Prueba los ejemplos, copia fragmentos de código con los botones integrados y alterna entre modo claro/oscuro.

### Sugerencias para desarrollo local
1. Instala la extensión **Live Server** (VS Code) o usa cualquier servidor estático para recargar al guardar.
2. Trabaja sobre ramas descriptivas: `feature/xml-ejemplos`, `fix/contraste-index`, etc.
3. Ejecuta `npm install -g @compodoc/live-server` si prefieres un servidor global sencillo.
4. Mantén sincronizados `VERSION` y `changelog.html` cada vez que publiques cambios visibles.

### Contenido destacado
- `xml.html` incluye ejemplos de DTD, XSD, XPath y transformaciones XSLT listos para copiar.
- `js/script.js` centraliza la lógica del selector de tema, copiado al portapapeles y control de paneles plegables.
- Las páginas `java.html` y `python.html` muestran integración práctica entre XML y lenguajes backend.

### Buenas prácticas de contribución de contenido
- Aporta ejemplos completos: código, explicación y ejercicio final.
- Usa un tono didáctico y consistente con el resto de tutoriales.
- Verifica el contraste de texto con herramientas como [Accessible Palette](https://accessiblepalette.com/).
- Añade enlaces externos con `rel="noopener"` cuando abran en nueva pestaña.

## GitHub Pages

### 🚀 Configuración

Este proyecto está configurado para funcionar con GitHub Pages. La página principal (`index.html` en la raíz) detecta automáticamente si el usuario está en un dispositivo móvil o desktop y lo redirige a la versión apropiada.

**URL de ejemplo**: `https://tu-usuario.github.io/tutorial_DAM/`

### Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, selecciona **Pages**
4. En **Source**, selecciona la rama `main` y carpeta `/ (root)`
5. Haz clic en **Save**
6. GitHub generará una URL pública (puede tardar 1-2 minutos)

### Características de la configuración

- **Detección automática**: El `index.html` en la raíz redirige a `mobile/` o `desktop/` según el dispositivo
- **Forzar versión**: Añade `?desktop=true` o `?mobile=true` a la URL para forzar una versión específica
- **Sin Jekyll**: El archivo `.nojekyll` desactiva Jekyll completamente, sirviendo el `index.html` directamente
- **Rutas relativas**: Todos los enlaces usan rutas relativas para funcionar tanto localmente como en GitHub Pages

**Importante**: Asegúrate de que el archivo `.nojekyll` existe en la raíz del repositorio. Esto garantiza que GitHub Pages sirva el `index.html` en lugar del README.md.

### Acceso directo a versiones

- **Versión Desktop**: `https://tu-usuario.github.io/tutorial_DAM/desktop/`
- **Versión Móvil**: `https://tu-usuario.github.io/tutorial_DAM/mobile/`

## Contribuir
Las contribuciones son bienvenidas. Antes de abrir un PR:
1. Crea una rama descriptiva desde `main`.
2. Aplica tus cambios asegurando consistencia visual y accesibilidad.
3. Actualiza `changelog.html` y el archivo `VERSION` conforme al versionado semántico.
4. Envía el PR describiendo claramente el alcance.

### Checklist rápido para PR
- [ ] Capturas o GIF si introduces un nuevo componente UI.
- [ ] Documentación actualizada (`README.md`, notas específicas del tutorial).
- [ ] Pruebas manuales en modo claro y oscuro.
- [ ] Verificación de enlaces externos y accesibilidad de teclado.
- [ ] Prueba local y en GitHub Pages si afecta rutas o navegación.

## Licencia
MIT License. Consulta el archivo `LICENSE` para más detalles.
