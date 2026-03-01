import express, {Express} from "express"
import cors from "cors"
import openApiSpecification from "./routes/open-api-specification"
import health from "./routes/health"
import companies from "./routes/node-types/companies"
import brands from './routes/node-types/brands'
import carModels from "./routes/node-types/car-models"
import carModelVariants from "./routes/node-types/car-model-variants"
import raceTracks from "./routes/node-types/race-tracks"
import trackLayouts from "./routes/node-types/track-layouts"
import racingSeries from "./routes/node-types/racing-series"
import racingEvents from "./routes/node-types/racing-events"
import racingSessions from "./routes/node-types/racing-sessions"
import sessionResults from "./routes/node-types/session-results"
import lapTimes from "./routes/node-types/lap-times"
import racingGames from "./routes/node-types/racing-games"
import gamingPlatforms from "./routes/node-types/gaming-platforms"
import magazines from "./routes/node-types/magazines"
import magazineIssues from "./routes/node-types/magazine-issues"
import images from "./routes/node-types/images"
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
app.use('/', carModelVariants)
app.use('/', raceTracks)
app.use('/', trackLayouts)
app.use('/', racingSeries)
app.use('/', racingEvents)
app.use('/', racingSessions)
app.use('/', sessionResults)
app.use('/', lapTimes)
app.use('/', racingGames)
app.use('/', gamingPlatforms)
app.use('/', magazines)
app.use('/', magazineIssues)
app.use('/', images)
app.use('/', relationships)

export {app}
