const knexLib = require('knex'); 

class ContenedorProducto {

    constructor ( config ) {
     this.knex = knexLib(config)
     }
    async crearTablaProductos () {
        return this.knex.schema.dropTableIfExists('productos').finally(() => {
            return this.knex.schema.createTable('productos', table => {
                table.increments('id').primary()
                table.string('title', 50).notNullable()
                table.integer('price').notNullable()
                table.string('thumbnail').notNullable()
            })
        })
    }

    async guardarProducto (producto) {       
        try {
            return this.knex('productos').insert(producto)    
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
    async getById (id) { 
        try {
            return this.knex('productos').select('id', 'title', 'price', 'thumbnail').where({id : id})
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
    async getAll () {  
        try {
            return this.knex('productos').select('*')
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
    async updateById (id, data) {
        try {
            return this.knex('productos').where({id: id}).update(data)
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
    async deleteById (id) {
        try {
            return this.knex('productos').where({id: id}).del()
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
    async deleteAll () {
        try {
            return this.knex('productos').del()
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
    async closeClient () {
        this.knex.destroy()
    }

}

module.exports = { ContenedorProducto };


