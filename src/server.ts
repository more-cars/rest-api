import express, {Express} from "express"
import cors from "cors"

const server: Express = express()
const PORT = 3000

// Allowing all CORS requests
// TODO: CORS was enabled to allow the Swagger UI to load the API Spec. Does this have any side-effects or introduce security risks?
server.use(cors())

server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
})

// API specification
server.get('/', async (req, res) => {
    const apiSpec = require('../specification/OpenAPI/more-cars.openapi.json')
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    res.send(apiSpec)
})

// Health check
server.get('/health', async (req, res) => {
    res.sendStatus(200)
})
