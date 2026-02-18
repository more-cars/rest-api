import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingSession} from "../../../../../../src/models/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        RacingSession.getAllHasImageRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelationshipType.RacingSessionHasImage,
            }, {
                id: 5,
                type: RelationshipType.RacingSessionHasImage,
            }, {
                id: 6,
                type: RelationshipType.RacingSessionHasImage,
            }
        ])

        const response = await request(app)
            .get('/racing-sessions/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        RacingSession.getAllHasImageRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-sessions/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingSession, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-sessions/123/has-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingSession, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-sessions/123/has-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
