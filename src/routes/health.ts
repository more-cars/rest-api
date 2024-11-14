import {Express} from "express"

// Health check
module.exports = (app: Express) => {
    app.get('/health', async (req, res) => {
        res.status(200)
        res.setHeader('Content-Type', 'text/plain')
        res.send("healthy")
    })
}
