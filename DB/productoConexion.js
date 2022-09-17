const productosConexion = {
    client: 'mysql',
    connection: {
      host: process.env.HOST || 'localhost',
      user: process.env.USER || 'root',
      password: process.env.PASSWORD || 'root',
      database: process.env.DATABASE || 'coderhouse'
    }
}

module.exports = productosConexion;