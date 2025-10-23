import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingSeries} from "../../../../../../src/models/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-racing-event‹ relationships', () => {
    test('Providing valid data', async () => {
        RacingSeries.getAllHasRacingEventRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: 'has-racing-event',
            }, {
                id: 5,
                type: 'has-racing-event',
            }, {
                id: 6,
                type: 'has-racing-event',
            }
        ])

        const response = await request(app)
            .get('/racing-series/123/has-racing-event')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        RacingSeries.getAllHasRacingEventRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-series/123/has-racing-event')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingSeries, 'getAllHasRacingEventRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-series/123/has-racing-event')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingSeries, 'getAllHasRacingEventRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-series/123/has-racing-event')

        expect(response.statusCode)
            .toBe(404)
    })
})
