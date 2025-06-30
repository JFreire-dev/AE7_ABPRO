$(document).ready(function () {
    $('.card-hover').on('click', function () {
        alert('Haz seleccionado: ' + $(this).find('.card-title').text());
    });

    // Efecto "hover" en móviles
    $('.card-hover').on('touchstart', function () {
        $(this).addClass('hover-mobile');
    });
    $('.card-hover').on('touchend touchcancel', function () {
        $(this).removeClass('hover-mobile');
    })
});

$(document).ready(function() {
  $('#form-reparacion').on('submit', function(e) {
    e.preventDefault();
    let errores = [];

    // Mínimo 3 caracteres para el nombre y solo con letras
    const nombre = $('#nombre').val().trim();
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(nombre)) {
      errores.push("El nombre debe contener solo letras y al menos 3 caracteres.");
    }

    // Para obligar que se seleccione un servicio
    const tipo = $('#tipo').val();
    if (!tipo) {
      errores.push("Debes seleccionar un tipo de reparación.");
    }

    // Para limitar el length de caracteres en la descripcion del servicio requerido
    const descripcion = $('#descripcion').val().trim();
    if (descripcion.length > 150) {
      errores.push("La descripción no debe exceder los 150 caracteres.");
    }

    // Agendar cita: lunes a viernes, 8 am - 6 pm (Corroborar que funcione bien esta funcion - quizas agregar que sea minimo desde el presente año)
    const fecha = $('#fecha').val();
    if (fecha) {
      const dateObj = new Date(fecha);
      const day = dateObj.getDay(); // Siendo 0 el domingo
      const hour = dateObj.getHours();
      if (day === 0 || day === 6) {
        errores.push("La cita debe ser de lunes a viernes.");
      }
      if (hour < 8 || hour >= 18) {
        errores.push("La hora de la cita debe ser entre 8:00 y 18:00."); // Horario laboral estandar
      }
    } else {
      errores.push("Debes agendar una cita.");
    }

    // Numero de tarjeta exactamente 16 dígitos ej: 1234 5678 9101 1121
    const tarjeta = $('#tarjeta').val().replace(/\s/g, '');
    if (!/^\d{16}$/.test(tarjeta)) {
      errores.push("El número de tarjeta debe tener exactamente 16 dígitos.");
    }

    // Nombre del titular minimo 3 caracteres
    const titular = $('#titular').val().trim();
    if (titular.length < 3) {
      errores.push("El nombre del titular debe tener al menos 3 caracteres.");
    }

    // CVV o CVC con la cantidad exacta
    const cvv = $('#cvv').val().trim();
    if (!/^\d{3}$/.test(cvv)) {
      errores.push("El CVV debe tener exactamente 3 dígitos.");
    }

    // Si esta enviar, si no mostrar el error que corresponde
    if (errores.length > 0) {
      alert(errores.join("\n"));
    } else {
      alert("Formulario enviado correctamente.");
      this.submit();
    }
  });
});
