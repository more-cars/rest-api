import {Express} from "express"
import {CarModel} from "../models/CarModel"
import {CarModelNode} from "../types/CarModelNode"

module.exports = (app: Express) => {
    app.get('/car-models/:id', async (req, res) => {
        const foundCarModel = await CarModel.findById(parseInt(req.params.id))

        if (!foundCarModel) {
            res.status(404)
            res.set('Content-Type', 'text/plain')
            return res.send(`A "Car Model" with ID ${req.params.id} could not be found.`)
        }

        res.status(200)
        res.set('Content-Type', 'application/json')
        res.send(marshalResponseBody(foundCarModel))
    })

    app.get('/car-models/', async (req, res) => {
        const foundCarModels = await CarModel.findAll()

        res.status(200)
        res.set('Content-Type', 'application/json')
        res.send(marshalResponseBodies(foundCarModels))
    })

    app.post('/car-models', async (req, res) => {
        try {
            const createdNode = await CarModel.create(unmarshalRequestBody(req.body))
            res.status(201)
            res.set('Content-Type', 'application/json')
            res.send(marshalResponseBody(createdNode))
        } catch (e) {
            res.status(422)
            res.set('Content-Type', 'text/plain')
            res.send('Request failed. Node could not be created.')
        }
    })
}

/**
 * Selects those attributes from the given request body that are legitimate in the context of creating a car model.
 * All other attributes that might exist in the object will be ignored.
 */
function unmarshalRequestBody(body: any) {
    const carModel: CarModelNode = {
        name: body.name,
    }

    return carModel
}

/**
 * Creates a valid response body from the given car model.
 */
function marshalResponseBody(carModel: CarModelNode) {
    const responseBody = {
        id: carModel.id,
        name: carModel.name,
    }

    return responseBody
}

/**
 * Creates a valid response body from the given collection of car models.
 */
function marshalResponseBodies(carModels: Array<CarModelNode>) {
    const responseBodies: any[] = []

    carModels.forEach((carModel: CarModelNode) => {
        responseBodies.push(marshalResponseBody(carModel))
    })

    return responseBodies
}
