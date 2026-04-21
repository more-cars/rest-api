import http from 'http'
import {closeDriver} from "./db/driver"
import {app} from "./app"

const PORT = 3000
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`🟢 More Cars API started`)
    console.log(`🟢 Available at http://localhost:${PORT}`)
    console.log(`🟢 Alias URL (if configured): http://api.more-cars.internal:${PORT}`)
    console.log(`🟢 Connected to the database at "${process.env.DB_HOST}"`)
})

async function shutdown(signal: string) {
    console.log(`🟡 Received signal ${signal}. Shutting down...`)
    await closeDriver()
    console.log('🟥 Database connection closed')

    server.close(() => {
        console.log('🟥 Application terminated')
        process.exit(0)
    })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
