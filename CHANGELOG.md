# Changelog

## [2.1.0] - 2025-11-11

### 🎨 Mejoras de Diseño y UX

#### Versión Desktop
- **Optimización del layout del index**: Contenido ahora visible sin necesidad de scroll
  - Reducidos márgenes y padding para mejor aprovechamiento del viewport
  - Centrado vertical del contenido con `justify-content: center`
  - Ajustado gap entre tarjetas a 1.5rem
  - Optimizado aspect-ratio de tarjetas tecnológicas (1/1, min-height: 180px)
- **Mejoras de rendimiento**:
  - Simplificados gradientes de fondo (de 10 a 6 capas radiales)
  - Añadida propiedad `will-change` para optimizar transiciones
  - Optimizadas animaciones con `cubic-bezier` más eficientes
  - Reducida duración de animaciones de fondo
  - Agregados preconnect links para fonts.googleapis.com y cdnjs.cloudflare.com

#### Versión Móvil
- **Botón de cambio de tema en changelog**: Implementado para mantener consistencia con otras páginas
  - Diseño con iconos sol/luna (Font Awesome)
  - Switch redondeado con transiciones suaves
  - Funcionalidad de persistencia con localStorage
  - Estilos coherentes con index-mobile y otras páginas

### 📚 Mejoras Educativas

#### Tutoriales CSS (Desktop y Móvil)
- **Estandarización de unidades de medida**:
  - Convertidos todos los ejemplos de código de `px` a `em` (unidades relativas)
  - Aplicada fórmula estándar: 1em = 16px
  - Ejemplos actualizados:
    - Dimensiones: 200px → 12.5em, 300px → 18.75em
    - Espaciados: 10px → 0.625em, 15px → 1em, 20px → 1.25em
    - Bordes: 1px → 0.0625em, 2px → 0.125em
    - Media queries: 768px → 48em, 1024px → 64em, 1280px → 80em
  - **Preservada sección educativa "Unidades en CSS"** con ejemplos originales en px para propósitos didácticos
  - Convertidos ~20 ejemplos en css.html
  - Convertidos ~25 ejemplos en css-mobile.html
  - Mejora de accesibilidad y escalabilidad siguiendo mejores prácticas CSS

### 🔧 Detalles Técnicos
- Conversiones precisas aplicadas a:
  - Box model (width, height, padding, margin, border)
  - Tipografía (font-size, letter-spacing, word-spacing)
  - Efectos visuales (box-shadow, text-shadow, border-radius)
  - Layouts (Flexbox gap, Grid template columns/rows, minmax)
  - Transformaciones (translate, translateX, translateY)
  - Filtros (blur en píxeles)
  - Funciones calc() y variables CSS
- Mantenida compatibilidad total con navegadores modernos
- Sin cambios en la funcionalidad, solo mejoras en estándares de código

---

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
