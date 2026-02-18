import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting all ›has-racing-session‹ relationships', () => {
    test('Providing valid data', async () => {
        RacingEvent.getAllHasRacingSessionRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelType.RacingEventHasRacingSession,
            }, {
                id: 5,
                type: RelType.RacingEventHasRacingSession,
            }, {
                id: 6,
                type: RelType.RacingEventHasRacingSession,
            }
        ])

        const response = await request(app)
            .get('/racing-events/123/has-racing-session')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        RacingEvent.getAllHasRacingSessionRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-events/123/has-racing-session')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'getAllHasRacingSessionRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-events/123/has-racing-session')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingEvent, 'getAllHasRacingSessionRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-events/123/has-racing-session')

        expect(response.statusCode)
            .toBe(404)
    })
})
