import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a specific ›has-image‹ relationship', () => {
    test('Providing valid data', async () => {
        Brand.getSpecificHasImageRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'has-image',
        })

        const response = await request(app)
            .get('/brands/123/has-image/567')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing invalid data (nodes do not exist)', async () => {
        vi.spyOn(Brand, 'getSpecificHasImageRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/brands/123/has-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (relationship does not exist)', async () => {
        vi.spyOn(Brand, 'getSpecificHasImageRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('has-image', 123)
            })

        const response = await request(app)
            .get('/brands/123/has-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Brand, 'getSpecificHasImageRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/brands/123/has-image/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
