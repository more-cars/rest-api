import express, {Express} from "express"
import cors from "cors"

const server: Express = express()
const PORT = 3000

// Allowing all CORS requests
// TODO: CORS was enabled to allow the Swagger UI to load the API Spec. Does this have any side-effects or introduce security risks?
server.use(cors())

require('./routes/health')(server)
require('./routes/open-api-specification')(server)
require('./routes/car-models')(server)

server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
