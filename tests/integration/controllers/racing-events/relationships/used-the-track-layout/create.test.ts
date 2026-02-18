import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Creating a ›used-the-track-layout‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingEvent.createUsedTheTrackLayoutRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.RacingEventUsedTheTrackLayout,
        })

        const response = await request(app)
            .post('/racing-events/123/used-the-track-layout/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingEvent, 'createUsedTheTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/racing-events/123/used-the-track-layout/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'createUsedTheTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/racing-events/123/used-the-track-layout/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RacingEvent, 'createUsedTheTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('used-the-track-layout', 123, 567)
            })

        const response = await request(app)
            .post('/racing-events/123/used-the-track-layout/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
