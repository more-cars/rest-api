import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting a specific ›has-car-model‹ relationship', () => {
    test('Providing valid data', async () => {
        Brand.getSpecificHasCarModelRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelationshipType.BrandHasCarModel,
        })

        const response = await request(app)
            .get('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing invalid data (nodes do not exist)', async () => {
        vi.spyOn(Brand, 'getSpecificHasCarModelRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (relationship does not exist)', async () => {
        vi.spyOn(Brand, 'getSpecificHasCarModelRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('has-car-model', 123)
            })

        const response = await request(app)
            .get('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Brand, 'getSpecificHasCarModelRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/brands/123/has-car-model/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
