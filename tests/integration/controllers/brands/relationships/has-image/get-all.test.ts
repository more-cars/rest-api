import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        Brand.getAllHasImageRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelationshipType.BrandHasImage,
            }, {
                id: 5,
                type: RelationshipType.BrandHasImage,
            }, {
                id: 6,
                type: RelationshipType.BrandHasImage,
            }
        ])

        const response = await request(app)
            .get('/brands/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Brand.getAllHasImageRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/brands/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Brand, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/brands/123/has-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Brand, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/brands/123/has-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
