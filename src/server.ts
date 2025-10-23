import fs from 'fs'
import http from 'http'
import https from 'https'
import {app} from "./app"

startHttpServer()
startHttpsServer()

function startHttpServer() {
    const HTTP_PORT = 3000

    const httpServer = http.createServer(app)
    httpServer.listen(HTTP_PORT, () => {
        console.log(`[HTTP] More Cars API started and running at http://localhost:${HTTP_PORT}`)
    })
}

function startHttpsServer() {
    if (!fs.existsSync(__dirname + '/../deployment/certificates/server.key') || !fs.existsSync(__dirname + '/../deployment/certificates/server.cert')) {
        console.error(`[HTTPS] More Cars API could not be started. No SSL certificate found.`)
        return
    }

    const HTTPS_PORT = 3443
    const privateKey = fs.readFileSync(__dirname + '/../deployment/certificates/server.key', 'utf8')
    const certificate = fs.readFileSync(__dirname + '/../deployment/certificates/server.cert', 'utf8')

    const httpsServer = https.createServer({key: privateKey, cert: certificate}, app)
    httpsServer.listen(HTTPS_PORT, () => {
        console.log(`[HTTPS] More Cars API started and running at https://localhost:${HTTPS_PORT}`)
    })
}
