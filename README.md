# X7 Pastelería y Catering — sitio web

Sistema web de gestión de pedidos y catálogo para X7, una pastelería y empresa de
catering de la ciudad de Ica, Perú, especializada en tortas decoradas por encargo,
bocaditos temáticos y buffets para eventos.

`X7` es un nombre de reemplazo. El nombre real se define más adelante.

Proyecto académico del curso **Marcos de Desarrollo Web** (UTP, ciclo 2026-2).

## Estado actual

**APF1: front end estático con Bootstrap.**

En esta entrega no hay Java, ni Spring, ni base de datos, ni backend de ningún
tipo. Todo es HTML, CSS y JavaScript del lado del cliente, con los datos de
muestra escritos a mano en el HTML.

## Cómo ver el sitio

No hay que instalar ni compilar nada. Se abre `templates/index.html` con un
navegador y se navega desde ahí.

Bootstrap, Bootstrap Icons y las tipografías se cargan por CDN, así que hace
falta conexión a internet para que el sitio se vea con sus estilos.

## Tecnologías

| Ahora (APF1) | Más adelante |
|---|---|
| HTML5, CSS3, JavaScript | Spring Boot, Spring Web |
| Bootstrap 5.3 por CDN | Thymeleaf (APF2) |
| Bootstrap Icons por CDN | JPA, Hibernate, Spring Data, MySQL (APF3) |
| Google Fonts por CDN | Spring Validator (APF3) |
| | Spring Security y JWT (PROY) |

Sin gestores de paquetes, sin bundlers y sin frameworks de JavaScript.

## Estructura del proyecto

```
x7-web/
├── README.md
├── CLAUDE.md                     Contexto del proyecto
├── docs/
│   ├── APF1-alcance.md           Especificación de esta entrega
│   ├── cobertura-silabo.md       Dónde está cada tema del temario
│   └── datos-demo.md             Datos de muestra de todas las páginas
├── templates/
│   ├── index.html                Página de inicio
│   ├── catalogo.html             Catálogo con filtro y vista rápida
│   ├── personalizado.html        Formulario de encargo a medida
│   ├── mis-pedidos.html          Historial de pedidos del cliente
│   └── fragments/
│       ├── head.html             Cabecera común
│       ├── navbar.html           Barra de navegación común
│       └── footer.html           Pie de página común
└── static/
    ├── css/estilos.css           Identidad de marca
    ├── js/main.js                Comportamientos del sitio
    └── img/                      Logotipo, productos, galería y portada
```

Las carpetas `templates/` y `static/` se llaman así porque en el APF2 se mueven
tal cual dentro de `src/main/resources/`.

## Las cuatro páginas

| Página | Qué contiene |
|---|---|
| `index.html` | Portada, categorías, productos destacados, cómo funciona, galería, testimonios y formulario de cotización |
| `catalogo.html` | Los quince productos, filtro por categoría, ventana modal de vista rápida y paginación |
| `personalizado.html` | Formulario de encargo a medida con trece campos, y las condiciones del encargo |
| `mis-pedidos.html` | Resumen por estado, tabla de pedidos con insignias, ventana modal de detalle y horario de atención |

Las demás vistas del sistema, como nosotros, contacto, inicio de sesión, registro
y administración, llegan en entregas posteriores.

## Cabecera, barra de navegación y pie

Los tres bloques comunes se mantienen en `templates/fragments/` como referencia y
se copian **sin ningún cambio** dentro de cada página. Deben ser idénticos en las
cuatro vistas: cualquier diferencia se paga caro al migrar a Thymeleaf en el APF2.

Si hay que cambiar la barra de navegación, se cambia primero en el fragmento y
después se copia a las cuatro páginas.

## JavaScript

`static/js/main.js` es el mismo archivo en las cuatro páginas y contiene cinco
bloques, cada uno con su comentario:

1. Marcado del enlace activo en la barra de navegación
2. Filtro del catálogo por categoría
3. Relleno de la ventana modal de vista rápida
4. Contador de caracteres del área de texto del encargo
5. Relleno de la ventana modal de detalle de pedido

Cada bloque comprueba antes si los elementos que necesita existen, así que en una
página que no los tiene simplemente no hace nada. Sin librerías externas, sin
almacenamiento y sin peticiones al servidor.

## Sistema de diseño

Los colores de marca están definidos como variables CSS en `static/css/estilos.css`.
Cambiar el valor en `:root` recolorea todo el sitio.

| Variable | Color | Uso |
|---|---|---|
| `--x7-primario` | `#A63A55` | Acciones principales |
| `--x7-primario-oscuro` | `#7E2A3F` | Estado hover |
| `--x7-acento` | `#C9A227` | Detalles y destacados |
| `--x7-crema` | `#F7EDE4` | Fondos de sección alternos |
| `--x7-texto` | `#2B2118` | Texto principal |
| `--x7-texto-suave` | `#6B6259` | Texto secundario |
| `--x7-borde` | `#E4D8CC` | Bordes |

Títulos en Playfair Display y texto en Inter, ambas por Google Fonts. Las clases
propias llevan el prefijo `x7-` para no chocar con las de Bootstrap.

## Imágenes

Las imágenes de `static/img/productos/`, `static/img/galeria/` y `static/img/hero/`
son **marcadores de posición neutros**, no fotografías reales. Se sustituyen por el
material fotográfico de la empresa cuando esté disponible, conservando los mismos
nombres de archivo y la proporción 4:3.

## Datos de muestra

Todo el contenido visible sale de `docs/datos-demo.md`. Los datos aún no definidos
aparecen entre corchetes, por ejemplo `[direccion pendiente]` o
`[telefono pendiente]`, para que se vea que faltan y no se confundan con datos
reales. Los nombres de clientes son ficticios.

## Equipo

| Integrante | Archivos a su cargo |
|---|---|
| | `templates/index.html` |
| | `templates/catalogo.html` |
| | `templates/personalizado.html` |
| | `templates/mis-pedidos.html` |
| | `templates/fragments/`, `static/css/estilos.css`, `static/js/main.js` |

El responsable de cada archivo está anotado además en el comentario de
identificación que abre el propio archivo.
