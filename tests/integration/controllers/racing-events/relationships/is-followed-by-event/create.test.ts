import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Creating a ›is-followed-by-event‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingEvent.createIsFollowedByEventRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.RacingEventIsFollowedByEvent))

        const response = await request(app)
            .post('/racing-events/123/is-followed-by-event/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingEvent, 'createIsFollowedByEventRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/racing-events/123/is-followed-by-event/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'createIsFollowedByEventRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/racing-events/123/is-followed-by-event/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RacingEvent, 'createIsFollowedByEventRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('is-followed-by-event', 123, 567)
            })

        const response = await request(app)
            .post('/racing-events/123/is-followed-by-event/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
