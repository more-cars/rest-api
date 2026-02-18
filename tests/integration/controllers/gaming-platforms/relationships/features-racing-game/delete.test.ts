import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {GamingPlatform} from "../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›features-racing-game‹ relationship', () => {
    test('Providing valid data', async () => {
        GamingPlatform.deleteFeaturesRacingGameRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/gaming-platforms/123/features-racing-game/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(GamingPlatform, 'deleteFeaturesRacingGameRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/gaming-platforms/123/features-racing-game/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(GamingPlatform, 'deleteFeaturesRacingGameRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('features-racing-game', 123, 567)
            })

        const response = await request(app)
            .delete('/gaming-platforms/123/features-racing-game/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(GamingPlatform, 'deleteFeaturesRacingGameRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/gaming-platforms/123/features-racing-game/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
