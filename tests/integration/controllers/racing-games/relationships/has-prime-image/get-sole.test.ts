import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingGame} from "../../../../../../src/models/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting the ›has-prime-image‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingGame.getHasPrimeImageRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.RacingGameHasPrimeImage,
        })

        const response = await request(app)
            .get('/racing-games/123/has-prime-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(RacingGame, 'getHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('has prime image', 123)
            })

        const response = await request(app)
            .get('/racing-games/123/has-prime-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingGame, 'getHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-games/123/has-prime-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingGame, 'getHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-games/123/has-prime-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
