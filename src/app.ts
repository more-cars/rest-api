import express, {Express} from "express"
import cors from "cors"
import openApiSpecification from "./routes/open-api-specification"
import health from "./routes/health"
import brands from './routes/brands'
import carModels from "./routes/car-models"
import images from "./routes/images"
import companies from "./routes/companies"
import relationships from "./routes/relationships"
import {basicAuthentication} from "./basicAuthentication"

const app: Express = express()

// Allowing all CORS requests
// TODO: CORS was enabled to allow the Swagger UI to load the API Spec. Does this have any side-effects or introduce security risks?
app.use(cors())

// enabling express to parse requests that have a json body
app.use(express.json())

// enabling basic auth (if credentials are configured)
app.use(basicAuthentication)

// registering all routes
app.use('/', openApiSpecification)
app.use('/', health)
app.use('/', brands)
app.use('/', carModels)
app.use('/', images)
app.use('/', companies)
app.use('/', relationships)

export {app}
