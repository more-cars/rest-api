import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {TrackLayout} from "../../../../../../src/models/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

describe('Creating a ›belongs-to-race-track‹ relationship', () => {
    test('Providing valid data', async () => {
        TrackLayout.createBelongsToRaceTrackRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'belongs-to-race-track',
        })

        const response = await request(app)
            .post('/track-layouts/123/belongs-to-race-track/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(TrackLayout, 'createBelongsToRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/track-layouts/123/belongs-to-race-track/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(TrackLayout, 'createBelongsToRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/track-layouts/123/belongs-to-race-track/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(TrackLayout, 'createBelongsToRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('belongs-to-race-track', 123, 567)
            })

        const response = await request(app)
            .post('/track-layouts/123/belongs-to-race-track/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
