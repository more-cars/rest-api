import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {TrackLayout} from "../../../../../../src/models/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›is-featured-in-racing-game‹ relationships', () => {
    test('Providing valid data', async () => {
        TrackLayout.getAllIsFeaturedInRacingGameRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: 'is-featured-in-racing-game',
            }, {
                id: 5,
                type: 'is-featured-in-racing-game',
            }, {
                id: 6,
                type: 'is-featured-in-racing-game',
            }
        ])

        const response = await request(app)
            .get('/track-layouts/123/is-featured-in-racing-game')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        TrackLayout.getAllIsFeaturedInRacingGameRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/track-layouts/123/is-featured-in-racing-game')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(TrackLayout, 'getAllIsFeaturedInRacingGameRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/track-layouts/123/is-featured-in-racing-game')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(TrackLayout, 'getAllIsFeaturedInRacingGameRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/track-layouts/123/is-featured-in-racing-game')

        expect(response.statusCode)
            .toBe(404)
    })
})
