import express from "express"
import compression from "compression"
import cors from "cors"
import {authentication} from "./routes/middleware/authentication"
import {basicAuthentication} from "./routes/middleware/basicAuthentication"
import {userDbNamespace} from "./userDbNamespace"
import openApiSpecification from "./routes/open-api-specification"
import health from "./routes/health"
import nodes from "./routes/nodes/nodes"
import relationships from "./routes/relationships"
import {registerNodeTypeRoutes} from "./routes/registerNodeTypeRoutes"

const app = express()

// needed, so the tracking still works with Kubernetes+Gateway+HTTPRoute
app.set('trust proxy', true)

// activating gzip
app.use(compression())

// activating tracking
// app.use(analyticsMiddleware)

// activating "auth" checks
app.use(authentication)

// activating "basic auth" checks
app.use(basicAuthentication)

// allowing all cross-origin requests
app.use(cors())

// activating JSON support (e.g. to be able to parse POST request bodies)
app.use(express.json())

// allowing/disallowing the user to create their own isolated namespace in the database
app.use(userDbNamespace)

// registering the routes
app.use('/', openApiSpecification)
app.use('/', health)
app.use('/', nodes)
app.use('/', relationships)
registerNodeTypeRoutes(app)

export {app}
