import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {TrackLayout} from "../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting the ›belongs-to-race-track‹ relationship', () => {
    test('Providing valid data', async () => {
        TrackLayout.getBelongsToRaceTrackRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.TrackLayoutBelongsToRaceTrack,
        })

        const response = await request(app)
            .get('/track-layouts/123/belongs-to-race-track')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(TrackLayout, 'getBelongsToRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('belongs to race track', 123)
            })

        const response = await request(app)
            .get('/track-layouts/123/belongs-to-race-track')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(TrackLayout, 'getBelongsToRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/track-layouts/123/belongs-to-race-track')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(TrackLayout, 'getBelongsToRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/track-layouts/123/belongs-to-race-track')

        expect(response.statusCode)
            .toBe(404)
    })
})
