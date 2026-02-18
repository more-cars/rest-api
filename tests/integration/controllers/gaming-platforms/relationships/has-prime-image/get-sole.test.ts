import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {GamingPlatform} from "../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting the ›has-prime-image‹ relationship', () => {
    test('Providing valid data', async () => {
        GamingPlatform.getHasPrimeImageRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.GamingPlatformHasPrimeImage,
        })

        const response = await request(app)
            .get('/gaming-platforms/123/has-prime-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(GamingPlatform, 'getHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('has prime image', 123)
            })

        const response = await request(app)
            .get('/gaming-platforms/123/has-prime-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(GamingPlatform, 'getHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/gaming-platforms/123/has-prime-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(GamingPlatform, 'getHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/gaming-platforms/123/has-prime-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
