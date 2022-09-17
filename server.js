const express = require('express');
const { engine } = require('express-handlebars')
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const routerProducto = require('./routes/routes')
const { getChat, guardarMensaje } = require('./controllers/chat.js');
const { getAll, guardarProductoForm} = require('./controllers/productos.js');

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
  const productos = await getAll();
  socket.emit('lista_productos', productos)

  const chat = await getChat()
  socket.emit('lista_chat', chat)

  socket.on('producto_guardado', async data => {
    await guardarProductoForm(data);
    const productos = await getAll();
    io.sockets.emit('lista_productos', productos)
  })

  socket.on('cliente_nuevo_mensaje_chat', async data => {
    await guardarMensaje(data);
    io.sockets.emit('lista_chat', await getChat())
  })
})

const PORT = process.env.PORT || 8080
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor http con web sockets, escuchando en puerto: ${PORT}`)
})
connectedServer.on("error", error => console.log)