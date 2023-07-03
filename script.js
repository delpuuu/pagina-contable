var carrito = [];
var totalCompra = 0;

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre: nombre, precio: precio });
  totalCompra += precio;
  mostrarCarrito();
}

function mostrarCarrito() {
  var listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = "";

  carrito.forEach(function(producto) {
    var itemCarrito = document.createElement("li");
    itemCarrito.textContent = producto.nombre + " - $" + producto.precio.toFixed(2);
    listaCarrito.appendChild(itemCarrito);
  });

  document.getElementById("total").textContent = totalCompra.toFixed(2);
}

function realizarCompra() {
  if (carrito.length > 0) {
    var numeroOrden = generarNumeroOrden();
    var totalPago = totalCompra.toFixed(2);

    document.getElementById("numero-orden").textContent = "Numero de orden: " + numeroOrden;
    document.getElementById("total-pago").textContent = "Total pagado: $" + totalPago;

    document.getElementById("carrito").style.display = "none";
    document.getElementById("comprobante").style.display = "block";
  }
}

function generarNumeroOrden() {
  return Math.floor(Math.random() * 1000000) + 1;
}

// Seleccionar todos los botones de información
var botonesInfo = document.querySelectorAll(".boton-info");

// Iterar sobre los botones y agregar el evento de click
botonesInfo.forEach(function(boton) {
  boton.addEventListener("click", function() {
    // Obtener el elemento padre del botón (el contenedor del producto)
    var contenedorProducto = this.parentNode;

    // Obtener el elemento de información adicional dentro del contenedor del producto
    var infoAdicional = contenedorProducto.querySelector(".info-adicional");

    // Cambiar el estado de visualización de la información adicional
    if (infoAdicional.style.display === "none") {
      infoAdicional.style.display = "block";
      this.textContent = "Ver menos";
    } else {
      infoAdicional.style.display = "none";
      this.textContent = "Ver más";
    }
  });
});

// Obtén una referencia al botón "Descargar PDF"
const descargarPdfBtn = document.getElementById('descargar-pdf');

// Asigna un controlador de eventos para el clic del botón
descargarPdfBtn.addEventListener('click', () => {
  // Crea un objeto jsPDF
  const doc = new jspdf.jsPDF();

  // Obtiene los valores del comprobante de pago
  const numeroOrden = document.getElementById('numero-orden').textContent;
  const totalPago = document.getElementById('total-pago').textContent;

  // Agrega el contenido al PDF
  doc.text('Comprobante de pago', 10, 10);
  doc.text(numeroOrden, 10, 20);
  doc.text(totalPago, 10, 30);

  // Descarga el archivo PDF
  doc.save('comprobante_pago.pdf');
});

