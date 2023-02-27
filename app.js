import express from 'express'
import productsRoutes from './src/routes/products.route.js'
import cartsRoutes from './src/routes/carts.route.js'
import { Server, Socket } from 'socket.io'
import realtimeRoutes from './src/routes/realtime.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('./views'))
app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)
app.use('/realtimeproducts', realtimeRoutes)

const puerto = 9090
const serverExpress = app.listen(puerto, () => {
    console.log("Express connected")
})

const serverIo = new Server(serverExpress)
serverIo.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on('msgCli', data => {
        console.log(data)
    })

    serverIo.sockets.emit('mensaje', 'Hola como estas??')
})