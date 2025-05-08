import express, {Express} from "express"
import cors from "cors"
import openApiSpecification from "./routes/open-api-specification"
import brands from './routes/brands'
import carModels from "./routes/car-models"
import health from "./routes/health"

const app: Express = express()

// Allowing all CORS requests
// TODO: CORS was enabled to allow the Swagger UI to load the API Spec. Does this have any side-effects or introduce security risks?
app.use(cors())

// enabling express to parse requests that have a json body
app.use(express.json())

// registering all routes
app.use('/', openApiSpecification)
app.use('/', health)
app.use('/', brands)
app.use('/', carModels)

export {app}
