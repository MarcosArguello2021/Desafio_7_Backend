const routerProducto = require('express').Router();
const { getAll,
    getProductoById,
    guardarProducto,
    updateProductoById,
    deleteProductoById, } = require('../controllers/productos.js');

routerProducto.get('/', async (req, res) => {
    try {
        res.json(await getAll());
    } catch (err) {
        res.status(500).send(`No se puede recuperar los datos ${err}`);
    }
});

routerProducto.get('/:id', async (req, res) => {
    try {
        res.json(await getProductoById(Number(req.params.id)))
    } catch (err) {
        res.status(200).json({ error: 'producto no encontrado' });
    }

})

routerProducto.post('/', async (req, res) => {
    res.json(await guardarProducto(req, res))
})

routerProducto.put('/:id', async (req, res) => {
    try {
        res.json(await updateProductoById(Number(req.params.id), req.body))
    } catch (err) {
        res.status(200).json({ error: 'producto no encontrado' });
    }
})

routerProducto.delete('/:id', async (req, res) => {
    res.json(await deleteProductoById(Number(req.params.id)))
})

module.exports = routerProducto;