import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingSession} from "../../../../../../src/models/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting the ›belongs-to-racing-event‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingSession.getBelongsToRacingEventRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelationshipType.RacingSessionBelongsToRacingEvent,
        })

        const response = await request(app)
            .get('/racing-sessions/123/belongs-to-racing-event')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(RacingSession, 'getBelongsToRacingEventRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('belongs to racing event', 123)
            })

        const response = await request(app)
            .get('/racing-sessions/123/belongs-to-racing-event')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingSession, 'getBelongsToRacingEventRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-sessions/123/belongs-to-racing-event')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingSession, 'getBelongsToRacingEventRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-sessions/123/belongs-to-racing-event')

        expect(response.statusCode)
            .toBe(404)
    })
})
