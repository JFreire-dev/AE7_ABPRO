$(document).ready(function () {
    $('.card-hover').on('click', function () {
        alert('Has seleccionado: ' + $(this).find('.card-title').text());
    });

    $('.card-hover').on('touchstart', function () {
        $(this).addClass('hover-mobile');
    });
    $('.card-hover').on('touchend touchcancel', function () {
        $(this).removeClass('hover-mobile');
    });

    $('#form-reparacion').on('submit', function (e) {
        e.preventDefault();
        let errores = [];

        const nombre = $('#nombre').val().trim();
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]{3,}$/.test(nombre)) {
            errores.push("El nombre debe contener solo letras y al menos 3 caracteres.");
        }

        const tipo = $('#tipo').val();
        if (!tipo) {
            errores.push("Debes seleccionar un tipo de reparación.");
        }

        const descripcion = $('#descripcion').val().trim();
        if (descripcion.length > 150) {
            errores.push("La descripción no debe exceder los 150 caracteres.");
        }

        const fecha = $('#fecha').val();
        if (fecha) {
            const dateObj = new Date(fecha);
            if (isNaN(dateObj.getTime())) {
                errores.push("La fecha ingresada no es válida.");
            } else {
                const day = dateObj.getDay();
                const hour = dateObj.getHours();
                if (day === 0 || day === 6) {
                    errores.push("La cita debe ser de lunes a viernes.");
                }
                if (hour < 8 || hour >= 18) {
                    errores.push("La hora de la cita debe ser entre 8:00 y 18:00.");
                }
            }
        } else {
            errores.push("Debes agendar una cita.");
        }

        const tarjeta = $('#tarjeta').val().replace(/\s/g, '');
        if (!/^\d{16}$/.test(tarjeta)) {
            errores.push("El número de tarjeta debe tener exactamente 16 dígitos.");
        }

        const titular = $('#titular').val().trim();
        if (titular.length < 3) {
            errores.push("El nombre del titular debe tener al menos 3 caracteres.");
        }

        const cvv = $('#cvv').val().trim();
        if (!/^\d{3}$/.test(cvv)) {
            errores.push("El CVV debe tener exactamente 3 dígitos.");
        }

        if (errores.length > 0) {
            alert(errores.join("\\n"));
        } else {
            alert("Formulario enviado correctamente.");
            $('#form-reparacion')[0].submit();
        }
    });
});
