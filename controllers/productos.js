const productosConexion = require('../DB/productoConexion.js');
const { ContenedorProducto} = require('../models/productos.js');
const fetch = require('node-fetch');
const cliente = new ContenedorProducto(productosConexion)

const getAll = async (req, res) => {
    try {
        const productos = await cliente.getAll();
        return productos;
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const getProductoById = async (req, res) => { 
    const { id } = req.params
    try {
        const producto = await cliente.getById(id)
        if (producto.length === 0) {
            return res.status(200).json({ error: 'producto no encontrado' });
        } else {
            return producto;
        }   
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const guardarProducto = async (req, res) => { 
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) {
        res.status(400).json({ error: 'Por favor ingrese todos los datos' });
    } else {
        const data = { title, price, thumbnail };
        try {
            await cliente.guardarProducto(data);
            res.status(200).json({mensaje: 'Nuevo producto guardado', producto});
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}

const updateProductoById = async (req, res) => {  
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) {
        res.status(400).json({ error: 'Por favor ingrese todos los datos' });
    } else {
        const data = { title, price, thumbnail };
        try {
            await cliente.updateById(id, data);
            res.status(200).json({message: 'Producto actualizado'});
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}

const deleteProductoById = async (req, res) => { 

    const { id } = req.params;
    try {
        const producto = await cliente.getById(id);
        if (producto.length != 0) {
            await cliente.deleteById(id);
            res.status(200).json({ message: 'Producto borrado'})
        } else {
            res.status(400).json({ error: 'No existen productos con este id' })
        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const deleteAllProductos = async (req, res) => {
    try {
        await cliente.deleteAll();
        res.status(200).json({ message: 'Se borraron todos los productos'})
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const  guardarProductoForm = async (data) => {
    try {
        const response = await fetch('http://localhost:8080/api/productos', {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        })
        const result = await response.json()
        return result

    } catch (error) {
        let err = new Error(error)
        return err
    }
}

module.exports = {
    getAll,
    getProductoById,
    guardarProducto,
    updateProductoById,
    deleteProductoById,
    deleteAllProductos,
    guardarProductoForm
}