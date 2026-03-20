import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {ModelCarBrand} from "../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›created-model-car‹ relationship', () => {
    test('Providing valid data', async () => {
        ModelCarBrand.deleteCreatedModelCarRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/model-car-brands/123/created-model-car/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(ModelCarBrand, 'deleteCreatedModelCarRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/model-car-brands/123/created-model-car/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(ModelCarBrand, 'deleteCreatedModelCarRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('created-model-car', 123, 567)
            })

        const response = await request(app)
            .delete('/model-car-brands/123/created-model-car/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(ModelCarBrand, 'deleteCreatedModelCarRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/model-car-brands/123/created-model-car/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
