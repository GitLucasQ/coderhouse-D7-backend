import express from 'express';
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
import { configMySQL, configSQLite } from './config'
import { Contenedor } from './contenedor';

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// ROUTES
app.get('/', (req, res) => {
    res.render('index')
})

app.use((req, res) => {
    res.status(404).json({
        'error': -2,
        'descripcion': 'Ruta no existente'
    })
})

const contenedorProductos = new Contenedor(configMySQL, 'productos');
const products = async () => contenedorProductos.getAllProducts();
const contenedorMensajes = new Contenedor(configSQLite, 'mensajes');
const messages = async () => contenedorMensajes.getAllMessages();

httpServer.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

io.on('connection', async (socket) => {
    console.log('nuevo cliente conectado')

    socket.emit('productos', await products());
    socket.emit('mensajes', await messages());

    socket.on('new-product', async (data) => {
        await contenedorProductos.addProduct(data)
        const newListOfProduct = await contenedorProductos.getAllProducts();
        io.emit('productos', newListOfProduct)
    });

    socket.on('new-message', async (data) => {
        await contenedorMensajes.addMessage(data);
        io.emit('mensajes', await contenedorMensajes.getAllMessages());
    })
})