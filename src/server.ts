import http from 'http'
import {app} from "./app"

startHttpServer()

function startHttpServer() {
    const HTTP_PORT = 3000

    const httpServer = http.createServer(app)
    httpServer.listen(HTTP_PORT, () => {
        console.log(`[HTTP] More Cars API started and running at http://localhost:${HTTP_PORT}`)
        console.log(`[HTTP] Alias http://api.more-cars.internal:${HTTP_PORT}`)
    })
}
