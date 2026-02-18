import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting the ›used-the-track-layout‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingEvent.getUsedTheTrackLayoutRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.RacingEventUsedTheTrackLayout,
        })

        const response = await request(app)
            .get('/racing-events/123/used-the-track-layout')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(RacingEvent, 'getUsedTheTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('used the track layout', 123)
            })

        const response = await request(app)
            .get('/racing-events/123/used-the-track-layout')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'getUsedTheTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-events/123/used-the-track-layout')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingEvent, 'getUsedTheTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-events/123/used-the-track-layout')

        expect(response.statusCode)
            .toBe(404)
    })
})
