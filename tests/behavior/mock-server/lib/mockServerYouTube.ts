import express from "express"
import {OpenAPIBackend} from "openapi-backend"

const api = new OpenAPIBackend({
    definition: __dirname + "/../api-specs/youtube.openapi.json",
    handlers: {
        notImplemented: (context, req, res) => {
            res.status(200)
                .json(context.api.mockResponseForOperation(context.operation.operationId as string, {code: 200}).mock)
        },
    },
})
api.init()

const mockApiServer = express()
mockApiServer.use(express.json())

// @ts-expect-error TS2345 TS2345
mockApiServer.use((req, res) => api.handleRequest(req, req, res))

const port = 3004
mockApiServer.listen(port, () =>
    console.log(`YouTube Mock Server running on http://localhost:${port}`)
)
