import express from "express"
import compression from "compression"
import cors from "cors"
import {authentication} from "./routes/middleware/authentication"
import {basicAuthentication} from "./routes/middleware/basicAuthentication"
import {userDbNamespace} from "./userDbNamespace"
import root from "./routes/root"
import openApiSpecification from "./routes/open-api-specification"
import health from "./routes/health"
import nodes from "./routes/nodes/nodes"
import {registerNodeTypeRoutes} from "./routes/registerNodeTypeRoutes"
import {notFound} from "./routes/notFound"

const app = express()

// activating gzip
app.use(compression())

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
app.use('/', root)
app.use('/', openApiSpecification)
app.use('/', health)
app.use('/', nodes)
registerNodeTypeRoutes(app)
app.use(notFound)

export {app}
