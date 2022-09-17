const { ContenedorChat} = require('../models/chat.js');
const chatConexion = require('../DB/chatConexion.js');
const { ContenedorProducto} = require('../models/productos.js');
const productoConexion = require('../DB/productoConexion.js');

const clienteChat = new ContenedorChat(chatConexion);
const clienteProducto = new ContenedorProducto(productoConexion);

const crearTablaChat = async () => {
    await clienteChat.crearTablaChat();
}

const crearTablaProductos = async () => {
    await clienteProducto.crearTablaProductos();
}

crearTablaChat();
crearTablaProductos();