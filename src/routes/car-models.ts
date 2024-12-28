import {Express} from "express"
import {CarModel} from "../models/CarModel"

// Car model
module.exports = (app: Express) => {
    // Get car model by id
    app.get('/car-models/:id', async (req, res) => {
        const carModel = await CarModel.findById(parseInt(req.params.id))

        if (!carModel) {
            res.status(404)
            res.setHeader('Content-Type', 'text/plain')
            return res.send(`A "Car Model" with ID ${req.params.id} could not be found.`)
        }

        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.send(carModel)
    })
}
