# tutorial_DAM

**Current version:** `v1.3.1`

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
├── index.html                # Landing page con tarjetas de acceso a cada tutorial
├── css/
│   └── style.css             # Hoja de estilos global con temas y gradientes animados
├── js/
│   └── script.js             # Interactividad (tema oscuro, copiado, scrollspy, toggles)
├── *.html                    # Tutoriales individuales por tecnología
├── README.md                 # Este documento
├── changelog.html            # Historial de cambios con diseño web
└── VERSION                   # Versión global del sitio
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

## Licencia
MIT License. Consulta el archivo `LICENSE` para más detalles.
