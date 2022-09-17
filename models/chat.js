const knexLib = require('knex'); 

class ContenedorChat {

    constructor ( config ) {
    this.knex = knexLib(config)
     }

    async crearTablaChat () {
        return this.knex.schema.dropTableIfExists('chat').finally(() => {
            return this.knex.schema.createTable('chat', table => {
                table.increments('id').primary()
                table.string('email', 50).notNullable()
                table.date('fecha').notNullable()
                table.string('mensaje').notNullable()
            })
        })
    }

    async getMensaje () {
        try {
            return this.knex('chat').select('email', 'fecha', 'mensaje')
        } catch (error) {
            
        }
    }

    async guardarMensaje (nuevoMensaje) {
        try {
            return this.knex('chat').insert(nuevoMensaje)         
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
}

module.exports = { ContenedorChat };