const path = require('path')

require('dotenv').config({path: path.join(__dirname, 'config.env')})

const Server = require('./src/server')
const config = require('./src/config')

function runServer() {
    process.on('uncaughtException', (err) => {
        console.error('uncaught exception', err, err.stack)
    })

    process.on('unhandledRejection', (err) => {
        console.error('unhandled promise rejection', err, err.stack)
    })

    const server = new Server(config)

    server
        .run()
        .catch(e => {
            console.error('error while starting server', e)
            process.exit(1)
        })
}

runServer()