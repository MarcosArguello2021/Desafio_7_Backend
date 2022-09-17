const chatConexion = require('../DB/chatConexion.js');
const { ContenedorChat} = require('../models/chat.js');

const cliente = new ContenedorChat(chatConexion)

const crearTabla = async () => {
    try {
        await cliente.crearTablaChat();
    } catch (error) {
        console.error(`El error es: ${error}`);
    }
}

const getChat = async () => {
    try {
        const mensajes = await cliente.getMensaje();
        return mensajes;
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const guardarMensaje = async (mensaje) => {

    try {
        return await cliente.guardarMensaje(mensaje);
    } catch (error) {
        return console.error(`El error es: ${error}`)
    }
}

module.exports = {
    crearTabla,
    getChat,
    guardarMensaje
}