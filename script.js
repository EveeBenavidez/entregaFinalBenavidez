//peticion del array de productos, con fetch al json
fetch("./productos.json")
    .then(response => response.json())
    .then(productos => miPrograma(productos)) 
    

function miPrograma(productos) {

let contenedorCarrito = document.getElementById("contenedorCarrito")
let contenedor = document.getElementById("contenedorProductos")
renderizarProductos(productos)

//renderizacion del storage
let carrito = []
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
}

renderizarCarrito(carrito)

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", renderizarProductosFiltrados)

function renderizarProductosFiltrados(){
    console.log(buscador.value)
    let productosFiltrados = productos.filter(producto => producto.nombre.toUpperCase().includes(buscador.value.toUpperCase()))
    renderizarProductos(productosFiltrados)
}

function renderizarProductos(arrayDeProductos){
    contenedor.innerHTML = ""
    for (const producto of arrayDeProductos) { 
    let tarjetaProducto = document.createElement("div")
    tarjetaProducto.className = "producto"
    tarjetaProducto.id = producto.id

    tarjetaProducto.innerHTML = 
    `
    <h3 class = nombreProductos> ${producto.nombre} </h3>
    <p> ID: ${producto.id} </p>
    <p> Precio: U$D ${producto.precio} </p>
    <img src= ${producto.imgUrl} id= "imagenesProductos">
    <button id=${producto.id} type="button" class="btn btn-secondary"> Añadir al Carrito </button>
    `
    
    contenedor.appendChild(tarjetaProducto)
    }
    let botones = document.getElementsByClassName("btn btn-secondary")
    for (const boton of botones) {
        boton.addEventListener ("click", agregarAlCarrito)
    }
}
function agregarAlCarrito (event){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se agregó al carrito',
        showConfirmButton: false,
        timer: 1500
    })
    let productoBuscado = productos.find(producto => producto.id == event.target.id)
    let posicionDelProductoBuscado = carrito.findIndex(producto => producto.id == productoBuscado.id)
    if(posicionDelProductoBuscado != -1){
        carrito[posicionDelProductoBuscado].unidades++
            carrito[posicionDelProductoBuscado].subtotal=carrito[posicionDelProductoBuscado].unidades * carrito[posicionDelProductoBuscado].precioUnitario
    
    }else{
        carrito.push({id: productoBuscado.id, nombre: productoBuscado.nombre, precioUnitario: productoBuscado.precio,unidades:1, subtotal: productoBuscado.precio})
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    
    renderizarCarrito(carrito)
    //total del carrito acumulador
    let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
    contenedorCarrito.innerHTML += `
    <h4> Total U$D: ${total}</h4>
    `
    
}
//total del carrito acumulador renderizado nuevamente
let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
contenedorCarrito.innerHTML += `
<h4> Total U$D: ${total}</h4>
`

let botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click", () => {Swal.fire({
    title: 'Confirma su compra?',
    showClass: {
    popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
    }
    
})
    localStorage.removeItem("carrito")
    carrito = []
    renderizarCarrito([])
})



// funcion de renderizado de carrito

function renderizarCarrito (arrayDeProductos){
    contenedorCarrito.innerHTML = ""
    for(const producto of arrayDeProductos){
        contenedorCarrito.innerHTML +=`
        <div class="flex">
        <p> ${producto.nombre} </p>
        <p> u$d ${producto.precioUnitario} </p>
        <p> Cantidad ${producto.unidades} </p>
        <p> u$d ${producto.subtotal} </p>
        </div>
        `
    }
}

//vaciar carrito

let botonVaciar = document.getElementById("vaciar")
botonVaciar.addEventListener("click", () => {
    localStorage.removeItem("carrito")
    carrito = []
    renderizarCarrito([])
})
}
