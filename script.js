let tiempoInicio, tiempoFin, cronometroIntervalo;

function iniciarTrabajo() {
  tiempoInicio = new Date();
  document.getElementById("btnInicio").disabled = true;
  cronometroIntervalo = setInterval(actualizarCronometro, 1000);
}

function actualizarCronometro() {
  const ahora = new Date();
  const diferencia = new Date(ahora - tiempoInicio);
  const horas = diferencia.getUTCHours().toString().padStart(2, '0');
  const minutos = diferencia.getUTCMinutes().toString().padStart(2, '0');
  const segundos = diferencia.getUTCSeconds().toString().padStart(2, '0');
  document.getElementById("cronometro").textContent = `Tiempo: ${horas}:${minutos}:${segundos}`;
}

function finalizarTrabajo() {
  clearInterval(cronometroIntervalo);
  tiempoFin = new Date();
  const tiempoTotal = document.getElementById("cronometro").textContent.replace("Tiempo: ", "");

  const registro = {
    establecimiento: document.getElementById("establecimiento").value,
    tecnico: document.getElementById("tecnico").value,
    zona: document.getElementById("zona").value,
    descripcion: document.getElementById("descripcion").value,
    observaciones: document.getElementById("observaciones").value,
    inicioTrabajo: tiempoInicio.toLocaleString(),
    finTrabajo: tiempoFin.toLocaleString(),
    tiempo: tiempoTotal
  };

  guardarRegistro(registro);
}

function guardarRegistro(registro) {
  fetch("https://script.google.com/macros/s/AKfycbzJMbCyI2Zz5AN6jMXTHWG2vJRF1J-wKYV5HGF_DCK5W4YMDD7UMTOsumHbfRaR32Rl/exec", {
    method: "POST",
    body: JSON.stringify(registro),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(texto => {
    alert("✅ Datos enviados correctamente: " + texto);
    document.getElementById("btnInicio").disabled = false;
    document.getElementById("cronometro").textContent = "Tiempo: 00:00:00";
  })
  .catch(err => {
    console.error("Error al enviar datos", err);
    alert("❌ Error al enviar los datos: " + err.message);
  });
}
