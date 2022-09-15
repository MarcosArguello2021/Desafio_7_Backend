const express = require('express');
const { engine } = require('express-handlebars')
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const { Contenedor } = require('./api/productos.js');
const productosApi = new Contenedor('./productos.txt');
const routerProducto = require('./routes/routes')
const { guardarProducto, getChat, saveChat } = require('./public/guardar');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/productos', routerProducto);


app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.get('/', async (req, res) => {
  res.render('form');
})

io.on('connection', async (socket) => {
  console.log('Usuario conectado')
  const productos = await productosApi.getAll();
  socket.emit('lista_productos', productos)

  const chat = await getChat()
  socket.emit('lista_chat', chat)

  socket.on('producto_guardado', async data => {
    const productos = await productosApi.save(data);
    io.sockets.emit('lista_productos', productos)
  })

  socket.on('cliente_nuevo_mensaje_chat', async data => {
    await saveChat(data)
    io.sockets.emit('lista_chat', await getChat())
  })
})

const PORT = process.env.PORT || 8080
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor http con web sockets, escuchando en puerto: ${PORT}`)
})
connectedServer.on("error", error => console.log)