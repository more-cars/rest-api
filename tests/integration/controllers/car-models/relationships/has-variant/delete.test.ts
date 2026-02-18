import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-variant‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModel.deleteHasVariantRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/car-models/123/has-variant/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(CarModel, 'deleteHasVariantRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/car-models/123/has-variant/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(CarModel, 'deleteHasVariantRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('has-variant', 123, 567)
            })

        const response = await request(app)
            .delete('/car-models/123/has-variant/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModel, 'deleteHasVariantRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/car-models/123/has-variant/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
