const express = require('express')
const cors = require('cors')

const DbManager = require('./db/database-manager')
const Logger = require('./lib/logger')
const API = require('./api')
const initJobs = require('./scheduler')

class Server {
  app
  api
  server
  dbManager
  port

  constructor(config) {
    const app = express()
    this.api = new API()
    this.app = app
    this.logger = new Logger()
    this.dbManager = new DbManager(config.DATABASE)
    this.port = config.SERVER.PORT
    app.use(cors())
    app.use('/api', this.api.getAPI())
  }

  listen() {
    this.server = this.app.listen(this.port, () => {
      console.log(`listening at http://localhost:${this.port}`)
    })
  }

  async run() {
    this.logger.setup()
    await this.dbManager.connect()
    initJobs()
    this.listen()
  }
}

module.exports = Server