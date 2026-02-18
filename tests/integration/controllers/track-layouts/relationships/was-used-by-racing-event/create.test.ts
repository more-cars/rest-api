import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {TrackLayout} from "../../../../../../src/models/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Creating a ›was-used-by-racing-event‹ relationship', () => {
    test('Providing valid data', async () => {
        TrackLayout.createWasUsedByRacingEventRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.TrackLayoutWasUsedByRacingEvent,
        })

        const response = await request(app)
            .post('/track-layouts/123/was-used-by-racing-event/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(TrackLayout, 'createWasUsedByRacingEventRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/track-layouts/123/was-used-by-racing-event/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(TrackLayout, 'createWasUsedByRacingEventRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/track-layouts/123/was-used-by-racing-event/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(TrackLayout, 'createWasUsedByRacingEventRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('was-used-by-racing-event', 123, 567)
            })

        const response = await request(app)
            .post('/track-layouts/123/was-used-by-racing-event/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
