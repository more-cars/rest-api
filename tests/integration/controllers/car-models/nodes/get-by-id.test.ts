import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a CAR MODEL by ID', () => {
    test('when it does not exist', async () => {
        CarModel.findById = vi.fn().mockImplementation(() => {
            throw new NodeNotFoundError(-42)
        })

        const response = await request(app)
            .get('/car-models/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('when it does exist', async () => {
        CarModel.findById = vi.fn().mockReturnValue({
            node_type: ModelNodeType.CarModel,
            attributes: {
                id: 12345,
            },
        })

        const response = await request(app)
            .get('/car-models/12345')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        CarModel.findById = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/car-models/12345')

        expect(response.statusCode)
            .toBe(500)
    })
})
