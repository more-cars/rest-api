import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›took-place-at-race-track‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingEvent.deleteTookPlaceAtRaceTrackRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/racing-events/123/took-place-at-race-track/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(RacingEvent, 'deleteTookPlaceAtRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/racing-events/123/took-place-at-race-track/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(RacingEvent, 'deleteTookPlaceAtRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('took-place-at-race-track', 123, 567)
            })

        const response = await request(app)
            .delete('/racing-events/123/took-place-at-race-track/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'deleteTookPlaceAtRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/racing-events/123/took-place-at-race-track/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
