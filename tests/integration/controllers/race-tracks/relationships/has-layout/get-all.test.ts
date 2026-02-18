import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RaceTrack} from "../../../../../../src/models/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting all ›has-layout‹ relationships', () => {
    test('Providing valid data', async () => {
        RaceTrack.getAllHasLayoutRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelType.RaceTrackHasLayout,
            }, {
                id: 5,
                type: RelType.RaceTrackHasLayout,
            }, {
                id: 6,
                type: RelType.RaceTrackHasLayout,
            }
        ])

        const response = await request(app)
            .get('/race-tracks/123/has-layout')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        RaceTrack.getAllHasLayoutRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/race-tracks/123/has-layout')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RaceTrack, 'getAllHasLayoutRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/race-tracks/123/has-layout')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RaceTrack, 'getAllHasLayoutRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/race-tracks/123/has-layout')

        expect(response.statusCode)
            .toBe(404)
    })
})
