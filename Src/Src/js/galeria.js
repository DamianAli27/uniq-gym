// Agrega más rutas separadas por comas en data-fotos de cada producto.
const ventana = document.createElement('dialog');
ventana.setAttribute('aria-label', 'Fotografías del producto');
ventana.innerHTML = '<div class="controles"><button type="button" class="cerrar">Cerrar ✕</button></div><h2></h2><img alt=""><div class="controles"><button type="button" class="anterior" aria-label="Foto anterior">←</button><span aria-live="polite"></span><button type="button" class="siguiente" aria-label="Foto siguiente">→</button></div>';
document.body.append(ventana);
let fotos = [], posicion = 0, titulo = '';
function mostrar() {
 ventana.querySelector('img').src = fotos[posicion];
 ventana.querySelector('img').alt = titulo + ' — foto ' + (posicion + 1);
 ventana.querySelector('span').textContent = (posicion + 1) + ' / ' + fotos.length;
 ventana.querySelector('.anterior').disabled = fotos.length < 2;
 ventana.querySelector('.siguiente').disabled = fotos.length < 2;
}
document.querySelectorAll('.abrir-foto').forEach(boton => boton.addEventListener('click', () => {
 fotos = boton.dataset.fotos.split(',').map(ruta => ruta.trim()).filter(Boolean);
 titulo = boton.closest('.producto').querySelector('h2').textContent;
 posicion = 0; ventana.querySelector('h2').textContent = titulo; mostrar(); ventana.showModal();
}));
ventana.querySelector('.cerrar').onclick = () => ventana.close();
function cambiar(paso) { posicion = (posicion + paso + fotos.length) % fotos.length; mostrar(); }
ventana.querySelector('.anterior').onclick = () => cambiar(-1);
ventana.querySelector('.siguiente').onclick = () => cambiar(1);
ventana.addEventListener('keydown', evento => {
 if (evento.key === 'ArrowLeft') cambiar(-1);
 if (evento.key === 'ArrowRight') cambiar(1);
});
