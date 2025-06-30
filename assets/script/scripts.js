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

