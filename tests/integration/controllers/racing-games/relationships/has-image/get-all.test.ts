import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingGame} from "../../../../../../src/models/node-types/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        RacingGame.getAllHasImageRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelType.RacingGameHasImage,
            }, {
                id: 5,
                type: RelType.RacingGameHasImage,
            }, {
                id: 6,
                type: RelType.RacingGameHasImage,
            }
        ])

        const response = await request(app)
            .get('/racing-games/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        RacingGame.getAllHasImageRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-games/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingGame, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-games/123/has-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingGame, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-games/123/has-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
