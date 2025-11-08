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
        console.log(`[HTTP] Alias http://api.more-cars.internal:${HTTP_PORT}`)
    })
}

function startHttpsServer() {
    const HTTPS_PORT = 3443
    const privateKey = getSslCertificateKey()
    const certificate = getSslCertificate()

    if (!privateKey || !certificate) {
        console.error(`[HTTPS] More Cars API could not be started. No SSL certificate found.`)

        return
    }

    const httpsServer = https.createServer({key: privateKey, cert: certificate}, app)
    httpsServer.listen(HTTPS_PORT, () => {
        console.log(`[HTTPS] More Cars API started and running at https://localhost:${HTTPS_PORT}`)
        console.log(`[HTTPS] Alias https://api.more-cars.internal:${HTTPS_PORT}`)
    })
}

function getSslCertificateKey() {
    const key = __dirname + '/../certificates/tls.key'

    if (fs.existsSync(key)) {
        return fs.readFileSync(key)
    }
}

function getSslCertificate() {
    const cert = __dirname + '/../certificates/tls.crt'

    if (fs.existsSync(cert)) {
        return fs.readFileSync(cert)
    }
}
