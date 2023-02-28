const socket = io()

socket.on('actualizar', products => {
    let divProducts = document.getElementById('products')
    divProducts.innerHTML=''
    for (const product of products) {
        const divProduct = renderProducto(product)
        divProducts.appendChild(divProduct)
    }
})

socket.emit('recibirProductos')
        
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
    limpiarInputsAdd()
}

function renderProducto(product) {

    let div = document.createElement("div")
    div.innerHTML = `<h2>Titulo: ${product.title}</h2>
        <ul>Id: ${product.id}</ul>
        <ul>Descripcion: ${product.description}</ul>
        <ul>Codigo: ${product.code}</ul>
        <ul>Precio: ${product.price}</ul>
        <ul>Stock: ${product.stock}</ul>
        <ul>Estado: ${product.status}</ul>
        <ul>Categoria: ${product.category}</ul>`
    
    return div
}

function limpiarInputsAdd() {
    document.querySelector('#title').value = ''
    document.querySelector('#description').value = ''
    document.querySelector('#code').value = ''
    document.querySelector('#price').value = ''
    document.querySelector('#stock').value = ''
    document.querySelector('#category').value = ''
}

function quitarPorSocket() {
    const id = document.querySelector('#id').value
    socket.emit('quitarProducto', id)
    limpiarInputRemove()

}

function limpiarInputRemove() {
    document.querySelector('#id').value = ''
}