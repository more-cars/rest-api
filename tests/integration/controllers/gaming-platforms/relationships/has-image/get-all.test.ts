import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {GamingPlatform} from "../../../../../../src/models/gaming-platforms/GamingPlatform"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        GamingPlatform.getAllHasImageRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: 'has-image',
            }, {
                id: 5,
                type: 'has-image',
            }, {
                id: 6,
                type: 'has-image',
            }
        ])

        const response = await request(app)
            .get('/gaming-platforms/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        GamingPlatform.getAllHasImageRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/gaming-platforms/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(GamingPlatform, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/gaming-platforms/123/has-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(GamingPlatform, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/gaming-platforms/123/has-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
