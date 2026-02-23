import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Image} from "../../../../../../src/models/node-types/images/Image"

describe('Requesting all ›belongs-to-node-type‹ relationships', () => {
    test('Providing valid data', async () => {
        Image.getBelongsToNodeTypeRelationships = vi.fn().mockReturnValue({
            companies: [],
            brands: [],
            car_models: [],
            car_model_variants: [],
            race_tracks: [],
            track_layouts: [],
            racing_series: [],
            racing_events: [],
            racing_sessions: [],
            session_results: [],
            lap_times: [],
            racing_games: [],
            gaming_platforms: [],
        })

        const response = await request(app)
            .get('/images/123/belongs-to-node-type')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Image, 'getBelongsToNodeTypeRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/images/123/belongs-to-node-type')

        expect(response.statusCode)
            .toBe(422)
    })

    test('Providing invalid data', async () => {
        Image.getBelongsToNodeTypeRelationships = vi.fn().mockReturnValue(false)

        const response = await request(app)
            .get('/images/123/belongs-to-node-type')

        expect(response.statusCode)
            .toBe(404)
    })
})
