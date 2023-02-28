import express from 'express'
import productsRoutes from './src/routes/products.route.js'
import cartsRoutes from './src/routes/carts.route.js'
import { Server } from 'socket.io'
import viewsRoute from './src/routes/views.route.js'
import { engine } from 'express-handlebars'
import ProductManager from './src/managers/ProductManager.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)
app.use('/', viewsRoute)

const puerto = 9090
const serverExpress = app.listen(puerto, () => {
    console.log("Express connected")
})

const serverIo = new Server(serverExpress)
serverIo.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on('recibirProductos', async () => {
        const productManager = new ProductManager('./src/data/products.json')
        socket.emit('actualizar', await productManager.getProducts())
    })

    socket.on('nuevoProducto', async (newProd) => {
        const productManager = new ProductManager('./src/data/products.json')
        try {
            const product = await productManager.addProduct(
                newProd.title,
                newProd.description,
                newProd.code,
                newProd.price,
                newProd.status,
                newProd.stock,
                newProd.category,
                newProd.thumbnail)        
        } catch (error) {
            console.log(error)
        }

        serverIo.sockets.emit('actualizar', await productManager.getProducts())
    })

    socket.on('quitarProducto', async(id) => {
        const productManager = new ProductManager('./src/data/products.json')
        await productManager.removeProduct(parseInt(id))

        serverIo.sockets.emit('actualizar', await productManager.getProducts())
    })
})