import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingGame} from "../../../../../../src/models/node-types/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›released-on-gaming-platform‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingGame.deleteReleasedOnGamingPlatformRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/racing-games/123/released-on-gaming-platform/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(RacingGame, 'deleteReleasedOnGamingPlatformRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/racing-games/123/released-on-gaming-platform/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(RacingGame, 'deleteReleasedOnGamingPlatformRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('released-on-gaming-platform', 123, 567)
            })

        const response = await request(app)
            .delete('/racing-games/123/released-on-gaming-platform/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingGame, 'deleteReleasedOnGamingPlatformRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/racing-games/123/released-on-gaming-platform/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
