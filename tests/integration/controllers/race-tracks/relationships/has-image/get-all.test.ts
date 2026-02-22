import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RaceTrack} from "../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Requesting all ›has-image‹ relationships', () => {
    test('Providing valid data', async () => {
        RaceTrack.getAllHasImageRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.RaceTrackHasImage),
            getFakeRel(RelType.RaceTrackHasImage),
            getFakeRel(RelType.RaceTrackHasImage),
        ])

        const response = await request(app)
            .get('/race-tracks/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        RaceTrack.getAllHasImageRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/race-tracks/123/has-image')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RaceTrack, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/race-tracks/123/has-image')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RaceTrack, 'getAllHasImageRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/race-tracks/123/has-image')

        expect(response.statusCode)
            .toBe(404)
    })
})
