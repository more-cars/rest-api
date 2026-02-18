import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        RacingEvent.getAllHasImageRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelType.RacingEventHasImage,
            }, {
                id: 5,
                type: RelType.RacingEventHasImage,
            }, {
                id: 6,
                type: RelType.RacingEventHasImage,
            }
        ])

        const response = await request(app)
            .get('/racing-events/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        RacingEvent.getAllHasImageRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-events/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-events/123/has-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingEvent, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-events/123/has-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
