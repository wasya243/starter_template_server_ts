const mongoose = require('mongoose')

class DatabaseManager {
    uri

    constructor(dbConfig = {}) {
        mongoose.Promise = global.Promise
        this.uri = dbConfig.URI
    }

    async connect() {
        const mongoOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 3000,
            socketTimeoutMS: 3000,
        }

        this.db = await mongoose.connect(this.uri, mongoOptions)

        console.log(`Database connection established`)

        return this.db
    }
}

module.exports = DatabaseManager