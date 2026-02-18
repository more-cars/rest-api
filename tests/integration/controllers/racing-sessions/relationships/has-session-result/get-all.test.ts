import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingSession} from "../../../../../../src/models/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting all ›has-session-result‹ relationships', () => {
    test('Providing valid data', async () => {
        RacingSession.getAllHasSessionResultRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelationshipType.RacingSessionHasSessionResult,
            }, {
                id: 5,
                type: RelationshipType.RacingSessionHasSessionResult,
            }, {
                id: 6,
                type: RelationshipType.RacingSessionHasSessionResult,
            }
        ])

        const response = await request(app)
            .get('/racing-sessions/123/has-session-result')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        RacingSession.getAllHasSessionResultRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-sessions/123/has-session-result')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingSession, 'getAllHasSessionResultRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-sessions/123/has-session-result')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingSession, 'getAllHasSessionResultRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-sessions/123/has-session-result')

        expect(response.statusCode)
            .toBe(404)
    })
})
