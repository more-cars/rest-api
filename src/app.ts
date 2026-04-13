import express, {Express} from "express"
import cors from "cors"
import {authentication} from "./routes/middleware/authentication"
import {basicAuthentication} from "./routes/middleware/basicAuthentication"
import {userDbNamespace} from "./userDbNamespace"
import openApiSpecification from "./routes/open-api-specification"
import health from "./routes/health"
import nodes from "./routes/nodes/nodes"
import relationships from "./routes/relationships"
import {registerNodeTypeRoutes} from "./routes/registerNodeTypeRoutes"

const app: Express = express()

// Allowing all CORS requests
// TODO: CORS was enabled to allow the Swagger UI to load the API Spec. Does this have any side-effects or introduce security risks?
app.use(cors())

// activating "auth" checks
app.use(authentication)

// activating "basic auth" checks
app.use(basicAuthentication)

// enabling express to parse requests that have a json body
app.use(express.json())

// creating an isolated namespace for the user in the database
app.use(userDbNamespace)

// registering all routes
app.use('/', openApiSpecification)
app.use('/', health)
app.use('/', nodes)
app.use('/', relationships)
registerNodeTypeRoutes(app)

export {app}
