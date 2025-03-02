import express, {Express} from "express"
import cors from "cors"

const app: Express = express()

// Allowing all CORS requests
// TODO: CORS was enabled to allow the Swagger UI to load the API Spec. Does this have any side-effects or introduce security risks?
app.use(cors())

// enabling express to parse requests that have a json body
app.use(express.json())

require('./routes/health')(app)
require('./routes/open-api-specification')(app)
require('./routes/car-models')(app)

export {app}
