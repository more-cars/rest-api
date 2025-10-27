import express, {Express} from "express"
import cors from "cors"
import openApiSpecification from "./routes/open-api-specification"
import health from "./routes/health"
import companies from "./routes/companies"
import brands from './routes/brands'
import carModels from "./routes/car-models"
import raceTracks from "./routes/race-tracks"
import trackLayouts from "./routes/track-layouts"
import racingSeries from "./routes/racing-series"
import racingEvents from "./routes/racing-events"
import racingSessions from "./routes/racing-sessions"
import images from "./routes/images"
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
app.use('/', companies)
app.use('/', brands)
app.use('/', carModels)
app.use('/', raceTracks)
app.use('/', trackLayouts)
app.use('/', racingSeries)
app.use('/', racingEvents)
app.use('/', racingSessions)
app.use('/', images)
app.use('/', relationships)

export {app}
