//productos

let productos = [
    { id: 1, nombre: "390 ADVENTURE", precio: 4000, imgUrl : "./imgs/390adv.jpeg"},
    { id: 2, nombre: "790 ADVENTURE", precio: 9100, imgUrl : "./imgs/790.jpg"},
    { id: 3, nombre: "890 ADVENTURE", precio: 10200, imgUrl : "./imgs/890.jpg"},
    { id: 4, nombre: "1290 SUPER DUKE", precio: 10300, imgUrl : "./imgs/990.jpg"},
    { id: 5, nombre: "1290 SUPER ADVENTURE", precio: 20300, imgUrl : "./imgs/1290sa.jpg"},
    { id: 6, nombre: "890 DUKE GP", precio: 19660, imgUrl : "./imgs/890dk.png"},
    { id: 7, nombre: "300 ENDURO EXC-2TP", precio: 19660, imgUrl : "./imgs/300.png"},
    { id: 8, nombre: "450 ENDURO EXC", precio: 7300, imgUrl : "./imgs/450.jpg"}
]




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
    <button class="botonAñadirCarrito" id=${producto.id}> Añadir al Carrito </button>
    `
    
    contenedor.appendChild(tarjetaProducto)
    }
    let botones = document.getElementsByClassName("botonAñadirCarrito")
    for (const boton of botones) {
        boton.addEventListener ("click", agregarAlCarrito)
    }
}
function agregarAlCarrito (event){
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
botonComprar.addEventListener("click", () => {
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



