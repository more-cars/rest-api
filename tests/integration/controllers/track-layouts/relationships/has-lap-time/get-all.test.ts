import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {TrackLayout} from "../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting all ›has-lap-time‹ relationships', () => {
    test('Providing valid data', async () => {
        TrackLayout.getAllHasLapTimeRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelType.TrackLayoutHasLapTime,
            }, {
                id: 5,
                type: RelType.TrackLayoutHasLapTime,
            }, {
                id: 6,
                type: RelType.TrackLayoutHasLapTime,
            }
        ])

        const response = await request(app)
            .get('/track-layouts/123/has-lap-time')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        TrackLayout.getAllHasLapTimeRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/track-layouts/123/has-lap-time')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(TrackLayout, 'getAllHasLapTimeRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/track-layouts/123/has-lap-time')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(TrackLayout, 'getAllHasLapTimeRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/track-layouts/123/has-lap-time')

        expect(response.statusCode)
            .toBe(404)
    })
})
