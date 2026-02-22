import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Creating a ›took-place-at-race-track‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingEvent.createTookPlaceAtRaceTrackRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.RacingEventTookPlaceAtRaceTrack))

        const response = await request(app)
            .post('/racing-events/123/took-place-at-race-track/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingEvent, 'createTookPlaceAtRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/racing-events/123/took-place-at-race-track/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'createTookPlaceAtRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/racing-events/123/took-place-at-race-track/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RacingEvent, 'createTookPlaceAtRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('took-place-at-race-track', 123, 567)
            })

        const response = await request(app)
            .post('/racing-events/123/took-place-at-race-track/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
