# Changelog

## [2.0.0] - 2025-11-06

### 🎉 Cambios Mayores
- **Reorganización completa del proyecto**: Estructura dividida en dos carpetas principales (`desktop/` y `mobile/`)
- **Versión móvil completamente renovada** con diseño optimizado y contenido expandido

### ✨ Nuevas Características

#### Estructura del Proyecto
- Creada carpeta `desktop/` con toda la versión de escritorio (CSS, JS, assets, HTML)
- Creada carpeta `mobile/` con versión móvil completa y optimizada
- Actualizados todos los enlaces de navegación entre versiones
- README.md actualizado con documentación de la nueva estructura

#### Versión Móvil
- **Botón flotante de changelog** en todas las páginas (naranja circular, esquina inferior derecha)
- **Sistema de resaltado de sintaxis** con 18 clases de colores para código
- **Tematización completa por página**:
  - HTML: Azul predominante (#3b82f6)
  - CSS: Morado (#8b5cf6)
  - JavaScript: Amarillo (#facc15)
  - XML: Rojo (#ef4444)
  - Java: Naranja (#f97316)
  - Python: Azul con amarillo (#3b82f6)
- **Contenido expandido**:
  - XML: De 355 a 867 líneas (17 secciones completas)
  - Java: 1364 líneas (streams, lambdas, Spring Boot, JPA)
  - Python: 1274 líneas (async/await, FastAPI, testing, decoradores)
  - Changelog: 509 líneas con historial completo

#### Mejoras de UX
- Corregido padding-top (76px) para evitar solapamiento con barra de navegación
- Barras de navegación temáticas con gradientes por página
- Info-cards con estilos distintivos (note, tip, important)
- Tag-lists con iconos temáticos
- Botones flotantes con animaciones y sombras mejoradas

### 🐛 Correcciones
- Solucionado solapamiento de contenido con barra superior en todas las páginas móviles
- Corregidos errores de sintaxis HTML en página XML (data-copy attributes)
- Ajustados selectores CSS de JavaScript (data-page="javascript" vs "js")
- Mejorada diferenciación de colores entre HTML, Java y JavaScript

### 📝 Versiones Anteriores
El historial completo está disponible en `desktop/changelog.html` y `mobile/changelog.html` con estilo visual animado.

---

**Nota**: Para consultar el changelog con el diseño visual del sitio, abre `desktop/changelog.html` o `mobile/changelog.html` en tu navegador.
