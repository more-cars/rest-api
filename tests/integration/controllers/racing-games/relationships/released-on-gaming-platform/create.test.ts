import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingGame} from "../../../../../../src/models/node-types/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Creating a ›released-on-gaming-platform‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingGame.createReleasedOnGamingPlatformRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.RacingGameReleasedOnGamingPlatform))

        const response = await request(app)
            .post('/racing-games/123/released-on-gaming-platform/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingGame, 'createReleasedOnGamingPlatformRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/racing-games/123/released-on-gaming-platform/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingGame, 'createReleasedOnGamingPlatformRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/racing-games/123/released-on-gaming-platform/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RacingGame, 'createReleasedOnGamingPlatformRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('released-on-gaming-platform', 123, 567)
            })

        const response = await request(app)
            .post('/racing-games/123/released-on-gaming-platform/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
