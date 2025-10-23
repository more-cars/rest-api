import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

describe('Creating a ›follows-event‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingEvent.createFollowsEventRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'follows-event',
        })

        const response = await request(app)
            .post('/racing-events/123/follows-event/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingEvent, 'createFollowsEventRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/racing-events/123/follows-event/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'createFollowsEventRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/racing-events/123/follows-event/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RacingEvent, 'createFollowsEventRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('follows-event', 123, 567)
            })

        const response = await request(app)
            .post('/racing-events/123/follows-event/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
