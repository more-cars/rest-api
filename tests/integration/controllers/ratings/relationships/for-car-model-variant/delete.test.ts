import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Rating} from "../../../../../../src/models/node-types/ratings/Rating"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›for-car-model-variant‹ relationship', () => {
    test('Providing valid data', async () => {
        Rating.deleteForCarModelVariantRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/ratings/123/for-car-model-variant/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(Rating, 'deleteForCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/ratings/123/for-car-model-variant/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(Rating, 'deleteForCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('for-car-model-variant', 123, 567)
            })

        const response = await request(app)
            .delete('/ratings/123/for-car-model-variant/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Rating, 'deleteForCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/ratings/123/for-car-model-variant/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
