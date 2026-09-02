/* ==========================================================================
   Archivo:     static/js/main.js
   Propósito:   JavaScript del sitio X7. Contiene los cuatro comportamientos
                del APF1, escritos en JavaScript nativo, sin librerías.
   Integrante:  ______________________________

   Los comportamientos, uno por bloque:
     1. Marcado del enlace activo en la barra de navegación
     2. Filtro del catálogo por categoría
     3. Relleno de la ventana modal de vista rápida        (catalogo.html)
     4. Contador de caracteres del área de texto           (personalizado.html)
     5. Relleno de la ventana modal de detalle de pedido   (mis-pedidos.html)

   Los cuatro primeros son los que pide docs/APF1-alcance.md. El quinto es
   el mismo bloque del punto 3 aplicado a la otra ventana modal, y evita
   repetir seis veces el marcado del detalle dentro del HTML.

   El archivo es el mismo en las cuatro páginas. Cada bloque comprueba
   primero si los elementos que necesita existen, así que en una página que
   no los tiene simplemente no hace nada.

   Sin almacenamiento y sin peticiones al servidor.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {


  /* ------------------------------------------------------------------------
     1. Marcado del enlace activo en la barra de navegación

     Se resuelve con JavaScript y no escribiendo la clase en el HTML, porque
     así el bloque de la barra queda idéntico en las cuatro páginas y se
     puede copiar tal cual.
     ------------------------------------------------------------------------ */

  var ruta = window.location.pathname;

  var trozos = ruta.split("/");
  var paginaActual = trozos[trozos.length - 1];

  // Si la dirección termina en barra, el navegador abre index.html
  if (paginaActual === "") {
    paginaActual = "index.html";
  }

  var enlaces = document.querySelectorAll(".x7-navbar .nav-link");

  enlaces.forEach(function (enlace) {

    if (enlace.getAttribute("href") === paginaActual) {
      enlace.classList.add("active");
      enlace.setAttribute("aria-current", "page");
    }

  });


  /* ------------------------------------------------------------------------
     2. Filtro del catálogo por categoría

     Cada botón de filtro lleva data-filtro y cada tarjeta lleva
     data-categoria. Al pulsar un botón se comparan los dos valores: la
     tarjeta que no coincide recibe la clase d-none de Bootstrap, que la
     oculta. No se borra nada del HTML, solo se muestra u oculta.
     ------------------------------------------------------------------------ */

  var botonesFiltro = document.querySelectorAll("[data-filtro]");
  var tarjetas = document.querySelectorAll("[data-categoria]");

  function filtrarCatalogo(categoria) {

    tarjetas.forEach(function (tarjeta) {

      if (categoria === "todos" || tarjeta.dataset.categoria === categoria) {
        tarjeta.classList.remove("d-none");
      } else {
        tarjeta.classList.add("d-none");
      }

    });

    botonesFiltro.forEach(function (boton) {

      if (boton.dataset.filtro === categoria) {
        boton.classList.add("active");
      } else {
        boton.classList.remove("active");
      }

    });

  }

  botonesFiltro.forEach(function (boton) {

    boton.addEventListener("click", function () {
      filtrarCatalogo(boton.dataset.filtro);
    });

  });

  // Si la dirección trae #tortas, #bocaditos o #buffets, el catálogo se
  // abre ya filtrado. Es lo que usan las tarjetas de categoría del inicio.
  var categoriaDeLaDireccion = window.location.hash.replace("#", "");

  if (categoriaDeLaDireccion !== "" && botonesFiltro.length > 0) {
    filtrarCatalogo(categoriaDeLaDireccion);
  }


  /* ------------------------------------------------------------------------
     3. Relleno de la ventana modal de vista rápida

     Hay una sola ventana modal para los quince productos. Bootstrap avisa
     con el evento show.bs.modal justo antes de abrirla, y en ese aviso
     entrega en relatedTarget el botón que se pulsó. De ese botón se leen
     los atributos data- con dataset y se escriben dentro de la ventana.
     ------------------------------------------------------------------------ */

  var modalProducto = document.getElementById("modal-producto");

  if (modalProducto) {

    modalProducto.addEventListener("show.bs.modal", function (evento) {

      // Botón "Vista rapida" que abrió la ventana
      var boton = evento.relatedTarget;

      var imagen = document.getElementById("modal-producto-imagen");
      imagen.setAttribute("src", boton.dataset.imagen);
      imagen.setAttribute("alt", boton.dataset.alt);

      document.getElementById("modal-producto-titulo").textContent = boton.dataset.nombre;
      document.getElementById("modal-producto-etiqueta").textContent = boton.dataset.etiqueta;
      document.getElementById("modal-producto-descripcion").textContent = boton.dataset.descripcion;
      document.getElementById("modal-producto-codigo").textContent = boton.dataset.codigo;
      document.getElementById("modal-producto-presentacion").textContent = boton.dataset.presentacion;
      document.getElementById("modal-producto-precio").textContent = boton.dataset.precio;

    });

  }


  /* ------------------------------------------------------------------------
     4. Contador de caracteres del área de texto del encargo

     El área de texto tiene maxlength, así que el navegador ya impide pasarse.
     El contador solo muestra cuántos caracteres quedan, para que la persona
     lo vea mientras escribe.
     ------------------------------------------------------------------------ */

  var areaDescripcion = document.getElementById("pedido-descripcion");
  var contador = document.getElementById("pedido-contador");

  if (areaDescripcion && contador) {

    areaDescripcion.addEventListener("input", function () {
      contador.textContent = areaDescripcion.maxLength - areaDescripcion.value.length;
    });

  }


  /* ------------------------------------------------------------------------
     5. Relleno de la ventana modal de detalle de pedido

     Es la misma técnica del punto 3, aplicada a la otra ventana modal del
     proyecto. Se repite el bloque en lugar de escribir una función que
     sirva para las dos, porque así cada uno se lee y se explica solo.
     ------------------------------------------------------------------------ */

  var modalPedido = document.getElementById("modal-pedido");

  if (modalPedido) {

    modalPedido.addEventListener("show.bs.modal", function (evento) {

      // Botón "Ver detalle" que abrió la ventana
      var boton = evento.relatedTarget;

      document.getElementById("modal-pedido-codigo").textContent = boton.dataset.codigo;
      document.getElementById("modal-pedido-fecha-pedido").textContent = boton.dataset.pedido;
      document.getElementById("modal-pedido-fecha-entrega").textContent = boton.dataset.entrega;
      document.getElementById("modal-pedido-productos").textContent = boton.dataset.productos;
      document.getElementById("modal-pedido-total").textContent = boton.dataset.total;

      var insignia = document.getElementById("modal-pedido-estado");
      insignia.textContent = boton.dataset.estado;
      insignia.className = "badge " + boton.dataset.clase;

    });

  }


});
