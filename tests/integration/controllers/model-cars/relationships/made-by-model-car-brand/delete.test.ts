import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {ModelCar} from "../../../../../../src/models/node-types/model-cars/ModelCar"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›made-by-model-car-brand‹ relationship', () => {
    test('Providing valid data', async () => {
        ModelCar.deleteMadeByModelCarBrandRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/model-cars/123/made-by-model-car-brand/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(ModelCar, 'deleteMadeByModelCarBrandRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/model-cars/123/made-by-model-car-brand/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(ModelCar, 'deleteMadeByModelCarBrandRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('made-by-model-car-brand', 123, 567)
            })

        const response = await request(app)
            .delete('/model-cars/123/made-by-model-car-brand/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(ModelCar, 'deleteMadeByModelCarBrandRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/model-cars/123/made-by-model-car-brand/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
