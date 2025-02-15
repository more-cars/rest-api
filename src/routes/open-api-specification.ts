import {Express} from "express"

// OpenAPI specification
module.exports = (app: Express) => {
    app.get('/', async (req, res) => {
        const apiSpec = require('../../specification/OpenAPI/more-cars.openapi.json')
        res.status(200)
        res.set('Content-Type', 'application/json')
        res.send(apiSpec)
    })
}
