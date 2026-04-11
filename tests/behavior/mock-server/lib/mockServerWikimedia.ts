import express from "express"
import {OpenAPIBackend} from "openapi-backend"

const api = new OpenAPIBackend({
    definition: __dirname + "/../api-specs/wikimedia.openapi.json",
    handlers: {
        getImage: (context, req, res) => {
            const mock = context.api.mockResponseForOperation(context.operation.operationId as string, {code: 200}).mock

            res.status(200)
                .json(mock)
        },
    },
})
api.init()

const mockApiServer = express()
mockApiServer.use(express.json())

// @ts-expect-error TS2345 TS2345
mockApiServer.use((req, res) => api.handleRequest(req, req, res))

const port = 3005
mockApiServer.listen(port, () =>
    console.log(`🟢 Wikimedia Mock Server running on http://localhost:${port}`)
)
