import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting the ›took-place-at-race-track‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingEvent.getTookPlaceAtRaceTrackRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'took-place-at-race-track',
        })

        const response = await request(app)
            .get('/racing-events/123/took-place-at-race-track')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(RacingEvent, 'getTookPlaceAtRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('took place at race track', 123)
            })

        const response = await request(app)
            .get('/racing-events/123/took-place-at-race-track')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'getTookPlaceAtRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-events/123/took-place-at-race-track')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingEvent, 'getTookPlaceAtRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-events/123/took-place-at-race-track')

        expect(response.statusCode)
            .toBe(404)
    })
})
