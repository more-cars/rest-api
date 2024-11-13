import {Express} from "express"

// Health check
module.exports = (app: Express) => {
    app.get('/health', async (req, res) => {
        res.sendStatus(200)
    })
}
