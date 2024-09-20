const estudiantes = [];
let filaAEliminar = null;

document.getElementById("registro").addEventListener("submit", function (event) {
  event.preventDefault();

  const codigo = parseFloat(document.getElementById("codigo").value);
  const nombre = document.getElementById("nombre").value;
  const primer20 = parseFloat(document.getElementById("nota1").value);
  const segundo20 = parseFloat(document.getElementById("nota2").value);
  const tercer20 = parseFloat(document.getElementById("nota3").value);
  const cuarenta = parseFloat(document.getElementById("nota4").value);

  // Verifica si el código ya está registrado
  const codigoExistente = estudiantes.some(estudiante => estudiante.codigo === codigo);
  const mensaje = document.getElementById("msg");

  if (codigoExistente) {
    mensaje.textContent = `El código ${codigo} ya está registrado.`;
    mensaje.style.display = 'block';
  } else {
    mensaje.style.display = 'none';

    const Pprimer20 = primer20 * 0.20;
    const Psegundo20 = segundo20 * 0.20;
    const Ptercer20 = tercer20 * 0.20;
    const Pcuarto20 = cuarenta * 0.40;

    const definitiva = Pprimer20 + Psegundo20 + Ptercer20 + Pcuarto20;
    const aprobado = definitiva >= 30 ? "A" : "N";

    const estudiante = { codigo, nombre, primer20, segundo20, tercer20, cuarenta, definitiva, aprobado };
    estudiantes.push(estudiante);

    agregarEstudianteATabla(estudiante);
    document.getElementById("registro").reset();
  }
});

function agregarEstudianteATabla(estudiante) {
  const tablaEstudiantes = document.getElementById("tbody-estudiantes");

  const nuevaFila = document.createElement("tr");

  const celdaBorrar = document.createElement("td");
  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "Borrar";
  btnBorrar.addEventListener("click", function () {
    filaAEliminar = nuevaFila;
    document.getElementById("modal").style.display = "block";
  });
  celdaBorrar.appendChild(btnBorrar);

  const celdaCodigo = document.createElement("td");
  const celdaNombre = document.createElement("td");
  const celdaPrimer20 = document.createElement("td");
  const celdaSegundo20 = document.createElement("td");
  const celdaTercer20 = document.createElement("td");
  const celdaCuarenta = document.createElement("td");
  const celdaDefinitiva = document.createElement("td");
  const celdaAprobado = document.createElement("td");

  celdaCodigo.textContent = estudiante.codigo;
  celdaNombre.textContent = estudiante.nombre;
  celdaPrimer20.textContent = estudiante.primer20;
  celdaSegundo20.textContent = estudiante.segundo20;
  celdaTercer20.textContent = estudiante.tercer20;
  celdaCuarenta.textContent = estudiante.cuarenta;
  celdaDefinitiva.textContent = estudiante.definitiva;
  celdaAprobado.textContent = estudiante.aprobado;

  nuevaFila.appendChild(celdaBorrar);
  nuevaFila.appendChild(celdaCodigo);
  nuevaFila.appendChild(celdaNombre);
  nuevaFila.appendChild(celdaPrimer20);
  nuevaFila.appendChild(celdaSegundo20);
  nuevaFila.appendChild(celdaTercer20);
  nuevaFila.appendChild(celdaCuarenta);
  nuevaFila.appendChild(celdaDefinitiva);
  nuevaFila.appendChild(celdaAprobado);

  tablaEstudiantes.appendChild(nuevaFila);
}

document.getElementById("btnConfirmar").addEventListener("click", function () {
  if (filaAEliminar) {
    filaAEliminar.parentNode.removeChild(filaAEliminar);
    filaAEliminar = null;
  }
  document.getElementById("modal").style.display = "none";
});

document.getElementById("btnCancelar").addEventListener("click", function () {
  filaAEliminar = null;
  document.getElementById("modal").style.display = "none";
});
