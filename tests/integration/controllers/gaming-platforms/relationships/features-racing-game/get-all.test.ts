import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {GamingPlatform} from "../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Requesting all ›features-racing-game‹ relationships', () => {
    test('Providing valid data', async () => {
        GamingPlatform.getAllFeaturesRacingGameRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.GamingPlatformFeaturesRacingGame),
            getFakeRel(RelType.GamingPlatformFeaturesRacingGame),
            getFakeRel(RelType.GamingPlatformFeaturesRacingGame),
        ])

        const response = await request(app)
            .get('/gaming-platforms/123/features-racing-game')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        GamingPlatform.getAllFeaturesRacingGameRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/gaming-platforms/123/features-racing-game')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(GamingPlatform, 'getAllFeaturesRacingGameRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/gaming-platforms/123/features-racing-game')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(GamingPlatform, 'getAllFeaturesRacingGameRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/gaming-platforms/123/features-racing-game')

        expect(response.statusCode)
            .toBe(404)
    })
})
