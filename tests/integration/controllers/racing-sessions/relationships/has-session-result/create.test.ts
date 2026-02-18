import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingSession} from "../../../../../../src/models/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Creating a ›has-session-result‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingSession.createHasSessionResultRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelationshipType.RacingSessionHasSessionResult,
        })

        const response = await request(app)
            .post('/racing-sessions/123/has-session-result/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingSession, 'createHasSessionResultRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/racing-sessions/123/has-session-result/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingSession, 'createHasSessionResultRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/racing-sessions/123/has-session-result/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RacingSession, 'createHasSessionResultRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('has-session-result', 123, 567)
            })

        const response = await request(app)
            .post('/racing-sessions/123/has-session-result/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
