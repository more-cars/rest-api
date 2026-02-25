import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModelVariant} from "../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a CAR MODEL VARIANT by ID', () => {
    test('when it does not exist', async () => {
        CarModelVariant.findById = vi.fn().mockImplementation(() => {
            throw new NodeNotFoundError(-42)
        })

        const response = await request(app)
            .get('/car-model-variants/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('when it does exist', async () => {
        CarModelVariant.findById = vi.fn().mockReturnValue({
            node_type: ModelNodeType.CarModelVariant,
            attributes: {
                id: 12345,
            },
        })

        const response = await request(app)
            .get('/car-model-variants/12345')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when the request is valid, but something breaks on the way', async () => {
        CarModelVariant.findById = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/car-model-variants/12345')

        expect(response.statusCode)
            .toBe(500)
    })
})
