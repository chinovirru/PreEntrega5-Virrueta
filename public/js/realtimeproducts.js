const socket = io()

socket.on('actualizar', products => {
    const divProducts = document.getElementById('products')
    divProducts.innerHTML = cargarProductosActuales(products)
})

socket.emit('recibirProductos')

        
// socket.on('mensaje', data => {
//     console.log(data)
//     socket.emit('msgCli', 'bien y vos?')
// })

function agregarPorSocket() {
    const product = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        code: document.querySelector('#code').value,
        price: document.querySelector('#price').value,
        status: true,
        stock: document.querySelector('#stock').value,
        category: document.querySelector('#category').value
    }
    socket.emit('nuevoProducto', product)
    console.log('Se envio formulario')
    limpiarInputsAdd()
    socket.emit('recibirProductos')
}

async function cargarProductosActuales(products) {
    console.log("Se carga los productos", JSON.stringify(products))
    // let listaProductos = products.map(product => {
    //     return `<h2>${product.title}</h2>
    //     <ul>${product.title}</ul>
    //     <ul>${product.description}</ul>
    //     <ul>${product.price}</ul>
    //     <ul>${product.category}</ul>`
    // })
}

function limpiarInputsAdd() {
    document.querySelector('#title').value = ''
    document.querySelector('#description').value = ''
    document.querySelector('#code').value = ''
    document.querySelector('#price').value = ''
    document.querySelector('#stock').value = ''
    document.querySelector('#category').value = ''
    console.log("Se limpio los input")
}

function quitarPorSocket() {
    const id = document.querySelector('#id').value
    socket.emit('quitarProducto', id)

}

function limpiarInputRemove() {
    document.querySelector('#id').value = ''
}