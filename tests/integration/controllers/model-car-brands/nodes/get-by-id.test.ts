import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {ModelCarBrand} from "../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a MODEL CAR BRAND by ID', () => {
    test('when it does not exist', async () => {
        ModelCarBrand.findById = vi.fn().mockImplementation(() => {
            throw new NodeNotFoundError(-42)
        })

        const response = await request(app)
            .get('/model-car-brands/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('when it does exist', async () => {
        ModelCarBrand.findById = vi.fn().mockReturnValue({
            node_type: ModelNodeType.ModelCarBrand,
            attributes: {
                id: 12345,
            },
        })

        const response = await request(app)
            .get('/model-car-brands/12345')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when the request is valid, but something breaks on the way', async () => {
        ModelCarBrand.findById = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/model-car-brands/12345')

        expect(response.statusCode)
            .toBe(500)
    })
})
