// Importamos los estilos de nuestra aplicación
import './style.css';

// Seleccionamos el contenedor principal
const app = document.querySelector('#app');

// Construimos la pantalla principal
app.innerHTML = `
  <header>
    <h1>⛽ Estación de Servicio</h1>
    <p>Galería Interactiva de Productos</p>
  </header>

  <main>
    <section class="bienvenida">
      <h2>Bienvenido a nuestra estación</h2>
      <p>Seleccione el departamento que desea visitar.</p>
    </section>

    <section class="departamentos">

      <article class="tarjeta">
        <h3>⛽ Pista</h3>
        <p>Consulta nuestros combustibles disponibles.</p>
        <button id="btnPista">Ver combustibles</button>
      </article>

      <article class="tarjeta">
        <h3>🏪 Tienda</h3>
        <p>Explora nuestras bebidas, snacks y alimentos.</p>
        <button id="btnTienda">Ver productos</button>
      </article>

    </section>

    <section id="contenido"></section>
  </main>

  <footer>
    <p>Proyecto académico - Bootcamp Kodigo</p>
  </footer>
`;

/* ==========================================
   ARREGLO DE COMBUSTIBLES
========================================== */
const combustibles = [
  {
    id: 1,
    nombre: "Gasolina Súper",
    categoria: "Combustibles",
    precio: 4.00,
    unidad: "Galón"
  },
  {
    id: 2,
    nombre: "Gasolina Regular",
    categoria: "Combustibles",
    precio: 3.75,
    unidad: "Galón"
  },
  {
    id: 3,
    nombre: "Diésel",
    categoria: "Combustibles",
    precio: 3.50,
    unidad: "Galón"
  }
];

console.log("Combustibles disponibles:", combustibles);

/* ==========================================
   ARREGLO DE PRODUCTOS DE TIENDA
========================================== */
const productos = [
  {
    id: 1,
    nombre: "Coca-Cola",
    precio: 1.25,
    categoria: "Bebidas"
  },
  {
    id: 2,
    nombre: "Agua Cristal",
    precio: 0.75,
    categoria: "Bebidas"
  },
  {
    id: 3,
    nombre: "Red Bull",
    precio: 2.50,
    categoria: "Bebidas"
  },
  {
    id: 4,
    nombre: "Papas Fritas",
    precio: 1.50,
    categoria: "Snacks"
  },
  {
    id: 5,
    nombre: "Galletas",
    precio: 0.85,
    categoria: "Snacks"
  },
  {
    id: 6,
    nombre: "Chocolate",
    precio: 1.00,
    categoria: "Snacks"
  },
  {
    id: 7,
    nombre: "Hot Dog",
    precio: 2.00,
    categoria: "Comidas"
  },
  {
    id: 8,
    nombre: "Sándwich",
    precio: 2.75,
    categoria: "Comidas"
  },
  {
    id: 9,
    nombre: "Hamburguesa",
    precio: 3.50,
    categoria: "Comidas"
  }
];

/* ==========================================
   VARIABLES PARA CONTROLAR LOS FILTROS
========================================== */

let categoriaSeleccionada = "Todos";

let precioMaximoSeleccionado = null;

/* ==========================================
   CONTROL DE PRODUCTOS SELECCIONADOS
========================================== */

let productosSeleccionados = [];

/* ==========================================
   SECCIÓN TIENDA DE CONVENIENCIA
========================================== */
const seccionTienda = `
    <section id="seccion-tienda">

        <h2>🏪 Tienda de Conveniencia</h2>

        <p>Explora nuestros productos disponibles.</p>

        <div class="filtros-categoria">

            <button class="btn-filtro" data-categoria="Todos">
                Todos
            </button>

            <button class="btn-filtro" data-categoria="Bebidas">
                Bebidas
            </button>

            <button class="btn-filtro" data-categoria="Snacks">
                Snacks
            </button>

            <button class="btn-filtro" data-categoria="Comidas">
                Comidas
            </button>

        </div>

        <!-- FILTRO POR PRECIO MÁXIMO -->

<form id="formPrecio">

    <label for="precioMaximo">
        Precio máximo ($):
    </label>

    <input
        type="number"
        id="precioMaximo"
        min="0"
        step="0.01"
        placeholder="Ejemplo: 1.50"
        required
    >

    <button type="submit">
        Filtrar precio
    </button>

    <button type="button" id="btnLimpiar">
        Limpiar filtros
    </button>

</form>

<p id="mensajeFiltro" aria-live="polite"></p> 

                <div id="galeria-productos"></div>

        <!-- RESUMEN DE PRODUCTOS SELECCIONADOS -->

        <section id="resumenCompra">

            <h3>Resumen de productos seleccionados</h3>

            <p id="cantidadSeleccionada">
                Artículos seleccionados: 0
            </p>

            <h2 id="totalPagar" aria-live="polite">
                Total a pagar: $0.00
            </h2>

        </section>

    </section>
`;

/* ==========================================
   MOSTRAR PRODUCTOS CON MAP()
========================================== */

function mostrarProductos(listaProductos = productos) {

  const galeria = document.querySelector("#galeria-productos");

  // Verificar si existen productos
  if (listaProductos.length === 0) {

    galeria.innerHTML = `
            <p>No se encontraron productos.</p>
        `;

    return;
  }

  // Generar tarjetas con map()
  const tarjetas = listaProductos.map((producto) => {

    return `
            <article class="tarjeta-producto">

                <h3>${producto.nombre}</h3>

                <p>Categoría: ${producto.categoria}</p>

                <p>Precio: $${producto.precio.toFixed(2)}</p>

                <label class="seleccion-producto">

                    <input
                        type="checkbox"
                        class="check-producto"
                        data-id="${producto.id}"
                        ${productosSeleccionados.includes(producto.id) ? "checked" : ""}
                    >

                    Seleccionar producto

                </label>

            </article>
        `;

  });

  // Mostrar las tarjetas
  galeria.innerHTML = tarjetas.join("");

}
/* ==========================================
   APLICAR FILTROS DE PRODUCTOS
========================================== */
function aplicarFiltros() {

  const productosFiltrados = productos.filter((producto) => {

    const cumpleCategoria =
      categoriaSeleccionada === "Todos" ||
      producto.categoria === categoriaSeleccionada;

    const cumplePrecio =
      precioMaximoSeleccionado === null ||
      producto.precio <= precioMaximoSeleccionado;

    return cumpleCategoria && cumplePrecio;

  });

  mostrarProductos(productosFiltrados);

}

/* ==========================================
   FILTRAR PRODUCTOS POR CATEGORÍA
========================================== */
function filtrarPorCategoria(categoria) {

  categoriaSeleccionada = categoria;

  aplicarFiltros();

}

/* ==========================================
   EVENTO DEL BOTÓN TIENDA
========================================== */
const btnTienda = document.querySelector("#btnTienda");

btnTienda.addEventListener("click", () => {

  const contenido = document.querySelector("#contenido");

  // Reiniciar los filtros al entrar a la tienda
  categoriaSeleccionada = "Todos";
  precioMaximoSeleccionado = null;
  productosSeleccionados = [];

  // Mostrar la sección de tienda
  contenido.innerHTML = seccionTienda;

  // Mostrar los nueve productos
  mostrarProductos();

  // Mostrar el total inicial
  calcularTotal();

  /* ==========================================
   CALCULAR TOTAL DE PRODUCTOS
========================================== */

  function calcularTotal() {

    // Buscar los productos seleccionados
    const productosMarcados = productos.filter((producto) => {

      return productosSeleccionados.includes(producto.id);

    });

    // Sumar los precios
    const total = productosMarcados.reduce((acumulador, producto) => {

      return acumulador + producto.precio;

    }, 0);

    // Mostrar cantidad seleccionada
    document.querySelector("#cantidadSeleccionada").textContent =
      `Artículos seleccionados: ${productosMarcados.length}`;

    // Mostrar total a pagar
    document.querySelector("#totalPagar").textContent =
      `Total a pagar: $${total.toFixed(2)}`;

  }

  /* ==========================================
   SELECCIONAR PRODUCTOS
========================================== */

  const galeriaProductos = document.querySelector("#galeria-productos");

  galeriaProductos.addEventListener("change", (event) => {

    if (!event.target.classList.contains("check-producto")) {
      return;
    }

    const idProducto = Number(event.target.dataset.id);

    if (event.target.checked) {

      // Agregar producto seleccionado
      if (!productosSeleccionados.includes(idProducto)) {

        productosSeleccionados.push(idProducto);

      }

    } else {

      // Quitar producto desmarcado
      productosSeleccionados = productosSeleccionados.filter((id) => {

        return id !== idProducto;

      });

    }

    calcularTotal();

  });

  // Seleccionar botones de categoría
  const botonesFiltro = document.querySelectorAll(".btn-filtro");

  botonesFiltro.forEach((boton) => {

    boton.addEventListener("click", () => {

      const categoria = boton.dataset.categoria;

      filtrarPorCategoria(categoria);

    });

  });

  /* ==========================================
     EVENTO PARA FILTRAR POR PRECIO
  ========================================== */
  const formPrecio = document.querySelector("#formPrecio");

  formPrecio.addEventListener("submit", (event) => {

    event.preventDefault();

    const inputPrecio = document.querySelector("#precioMaximo");

    const precioIngresado = Number(inputPrecio.value);

    if (
      inputPrecio.value.trim() === "" ||
      !Number.isFinite(precioIngresado) ||
      precioIngresado < 0
    ) {

      document.querySelector("#mensajeFiltro").textContent =
        "Ingrese un precio válido.";

      return;
    }

    precioMaximoSeleccionado = precioIngresado;

    document.querySelector("#mensajeFiltro").textContent = "";

    aplicarFiltros();

  });

  /* ==========================================
     EVENTO PARA LIMPIAR FILTROS
  ========================================== */
  const btnLimpiar = document.querySelector("#btnLimpiar");

  btnLimpiar.addEventListener("click", () => {

    categoriaSeleccionada = "Todos";

    precioMaximoSeleccionado = null;

    document.querySelector("#precioMaximo").value = "";

    document.querySelector("#mensajeFiltro").textContent = "";

    aplicarFiltros();

  });

});

/* ==========================================
   SECCIÓN PISTA
========================================== */

const seccionPista = `
    <section id="seccion-pista">

        <h2>⛽ Pista - Despacho de Combustible</h2>

        <p>Seleccione el combustible y la modalidad de despacho.</p>

        <div id="galeria-combustibles"></div>

        <h3>Simulación de despacho</h3>

        <form id="formDespacho">

            <label for="tipoCombustible">
                Tipo de combustible:
            </label>

            <select id="tipoCombustible" required>
                <option value="">Seleccione combustible</option>
                <option value="1">Gasolina Súper</option>
                <option value="2">Gasolina Regular</option>
                <option value="3">Diésel</option>
            </select>

            <label for="modalidadDespacho">
                Modalidad de despacho:
            </label>

            <select id="modalidadDespacho" required>
                <option value="dolares">Por dólares</option>
                <option value="galones">Por galones</option>
            </select>

            <label for="cantidadDespacho" id="labelCantidad">
                Monto a despachar ($):
            </label>

            <input
                type="number"
                id="cantidadDespacho"
                min="0.01"
                step="any"
                placeholder="Ejemplo: 20.00"
                required
            >

            <button type="submit">
                Calcular despacho
            </button>

        </form>

        <div id="resultadoDespacho" aria-live="polite"></div>

    </section>
`;

/* ==========================================
   MOSTRAR COMBUSTIBLES
========================================== */

function mostrarCombustibles() {

  const galeria = document.querySelector("#galeria-combustibles");

  const tarjetas = combustibles.map((combustible) => {

    return `
            <article class="tarjeta-producto">

                <h3>${combustible.nombre}</h3>

                <p>Precio por galón:</p>

                <p>$${combustible.precio.toFixed(2)}</p>

            </article>
        `;

  });

  galeria.innerHTML = tarjetas.join("");

}

/* ==========================================
   CALCULAR DESPACHO DE COMBUSTIBLE
========================================== */

function calcularDespacho(combustible, modalidad, cantidad) {

  let galones = 0;
  let total = 0;

  // DESPACHO POR DÓLARES

  if (modalidad === "dolares") {

    total = cantidad;

    galones = total / combustible.precio;

  }

  // DESPACHO POR GALONES

  else if (modalidad === "galones") {

    galones = cantidad;

    total = galones * combustible.precio;

  }

  return {
    galones: galones,
    total: total
  };

}

/* ==========================================
   EVENTO DEL BOTÓN PISTA
========================================== */

const btnPista = document.querySelector("#btnPista");

btnPista.addEventListener("click", () => {

  const contenido = document.querySelector("#contenido");

  // Mostrar sección Pista
  contenido.innerHTML = seccionPista;

  // Generar tarjetas de combustibles
  mostrarCombustibles();

  // Seleccionar controles
  const modalidadDespacho =
    document.querySelector("#modalidadDespacho");

  const labelCantidad =
    document.querySelector("#labelCantidad");

  const inputCantidad =
    document.querySelector("#cantidadDespacho");

  // Cambiar etiqueta según modalidad
  modalidadDespacho.addEventListener("change", () => {

    if (modalidadDespacho.value === "dolares") {

      labelCantidad.textContent = "Monto a despachar ($):";

      inputCantidad.placeholder = "Ejemplo: 20.00";

    } else {

      labelCantidad.textContent = "Cantidad de galones:";

      inputCantidad.placeholder = "Ejemplo: 5";

    }

    inputCantidad.value = "";

    document.querySelector("#resultadoDespacho").innerHTML = "";

  });

  // Evento del formulario
  const formDespacho = document.querySelector("#formDespacho");

  formDespacho.addEventListener("submit", (event) => {

    event.preventDefault();

    const idCombustible = Number(
      document.querySelector("#tipoCombustible").value
    );

    const modalidad = modalidadDespacho.value;

    const cantidad = Number(inputCantidad.value);

    // Buscar combustible seleccionado
    const combustibleSeleccionado = combustibles.find((combustible) => {

      return combustible.id === idCombustible;

    });

    // Validar información
    if (
      !combustibleSeleccionado ||
      !Number.isFinite(cantidad) ||
      cantidad <= 0
    ) {

      document.querySelector("#resultadoDespacho").textContent =
        "Ingrese un combustible y una cantidad válida.";

      return;
    }

    // Calcular despacho
    const resultado = calcularDespacho(
      combustibleSeleccionado,
      modalidad,
      cantidad
    );

    // Mostrar resultado
    document.querySelector("#resultadoDespacho").innerHTML = `
            <article class="resultado-combustible">

                <h3>⛽ Resultado del despacho</h3>

                <p>
                    Combustible:
                    ${combustibleSeleccionado.nombre}
                </p>

                <p>
                    Precio por galón:
                    $${combustibleSeleccionado.precio.toFixed(2)}
                </p>

                <p>
                    Galones:
                    ${resultado.galones.toFixed(3)}
                </p>

                <p>
                    Total a pagar:
                    $${resultado.total.toFixed(2)}
                </p>

            </article>
        `;

  });

});