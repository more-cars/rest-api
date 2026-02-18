import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {TrackLayout} from "../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting all ›was-used-by-racing-event‹ relationships', () => {
    test('Providing valid data', async () => {
        TrackLayout.getAllWasUsedByRacingEventRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelType.TrackLayoutWasUsedByRacingEvent,
            }, {
                id: 5,
                type: RelType.TrackLayoutWasUsedByRacingEvent,
            }, {
                id: 6,
                type: RelType.TrackLayoutWasUsedByRacingEvent,
            }
        ])

        const response = await request(app)
            .get('/track-layouts/123/was-used-by-racing-event')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        TrackLayout.getAllWasUsedByRacingEventRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/track-layouts/123/was-used-by-racing-event')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(TrackLayout, 'getAllWasUsedByRacingEventRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/track-layouts/123/was-used-by-racing-event')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(TrackLayout, 'getAllWasUsedByRacingEventRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/track-layouts/123/was-used-by-racing-event')

        expect(response.statusCode)
            .toBe(404)
    })
})
