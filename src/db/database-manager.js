const mongoose = require('mongoose')

class DatabaseManager {
  db
  port
  host
  dbName

  constructor(dbConfig = {}) {
    mongoose.Promise = global.Promise
    this.port = dbConfig.PORT
    this.dbName = dbConfig.NAME
    this.host = dbConfig.HOST
  }

  _getConnectionUrl() {
    return `mongodb://${this.host}:${this.port}/${this.dbName}`
  }

  async connect() {
    const url = this._getConnectionUrl()
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 3000,
      socketTimeoutMS: 3000,
    }

    this.db = await mongoose.connect(url, mongoOptions)

    console.log(`Database connection established`)

    return this.db
  }
}

module.exports = DatabaseManager