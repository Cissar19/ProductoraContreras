const carousel = document.querySelector('#carouselExampleCaptions') 
const agregarCursos = document.querySelector('#lista-cursos') 
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarro = document.querySelector('#vaciar')

let articulosCarrito = [];

cargarEventListener();

function cargarEventListener(){
    carousel.addEventListener('click',seleccionCarousel)
    agregarCursos.addEventListener('click',agregarCurso)
    document.addEventListener('DOMContentLoaded',() => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []
        carritoHTML();
    })
    vaciarCarro.addEventListener('click',vaciarCarro => {
        articulosCarrito= [];
        limpiarHTML();
    })

}

function seleccionCarousel(){
    console.log('estas seleccionando el corrousel');
};

function agregarCurso(e){
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatos(cursoSeleccionado)
    }
};





function leerDatos(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h5').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('button ').getAttribute('data-id'),
        cantidad: 1
    }
    articulosCarrito = [...articulosCarrito, infoCurso]
    console.log(articulosCarrito)
    carritoHTML();
}

function carritoHTML (){
    limpiarHTML();
    articulosCarrito.forEach (curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" width= "40px" height ="40px"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href class='borrar-curso' data-id='{$curso.id}'>X</a>
            </td>

        `;
        contenedorCarrito.appendChild(row);
        sincronizarStorage();
    })


    function sincronizarStorage (){
        localStorage.setItem('carrito',JSON.stringify(articulosCarrito))
    }
}

function limpiarHTML(){
    contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}