import express, {Express} from "express"
import cors from "cors"
import {healthCheck} from "./routes/health"
import {openApiSpec} from "./routes/open-api-specification"
import {createCarModel, getAllCarModels, getCarModelById} from "./routes/car-models"
import {create} from "./routes/brands/create"
import {getById} from "./routes/brands/getById"

const app: Express = express()

// Allowing all CORS requests
// TODO: CORS was enabled to allow the Swagger UI to load the API Spec. Does this have any side-effects or introduce security risks?
app.use(cors())

// enabling express to parse requests that have a json body
app.use(express.json())

// registering all routes
app.get('/', openApiSpec)
app.get('/health', healthCheck)
app.get('/car-models', getAllCarModels)
app.get('/car-models/:id', getCarModelById)
app.post('/car-models', createCarModel)
app.post('/brands', create)
app.get('/brands/:id', getById)

export {app}
