import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›has-car-model‹ relationship', () => {
    test('Providing valid data', async () => {
        Brand.deleteHasCarModelRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(Brand, 'deleteHasCarModelRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(Brand, 'deleteHasCarModelRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('has-car-model', 123, 567)
            })

        const response = await request(app)
            .delete('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Brand, 'deleteHasCarModelRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
