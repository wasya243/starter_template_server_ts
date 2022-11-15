const CONFIG = {
  DATABASE: {
    URI: process.env.MONGO_URI
  },
  SERVER: {
    PORT: parseInt(process.env.PORT, 10)
  }
}

module.exports = CONFIG