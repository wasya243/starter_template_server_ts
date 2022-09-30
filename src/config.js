const CONFIG = {
  DATABASE: {
    PORT: parseInt(process.env.DB_PORT, 10),
    HOST: process.env.DB_HOST,
    NAME: process.env.DB_NAME
  },
  SERVER: {
    PORT: parseInt(process.env.PORT, 10)
  }
}

module.exports = CONFIG