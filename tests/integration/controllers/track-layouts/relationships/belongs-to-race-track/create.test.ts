import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {TrackLayout} from "../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

describe('Creating a ›belongs-to-race-track‹ relationship', () => {
    test('Providing valid data', async () => {
        TrackLayout.createBelongsToRaceTrackRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.TrackLayoutBelongsToRaceTrack))

        const response = await request(app)
            .post('/track-layouts/123/relationships/belongs-to-race-track')
            .send({
                data: {
                    type: ControllerNodeType.RaceTrack,
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(TrackLayout, 'createBelongsToRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/track-layouts/123/relationships/belongs-to-race-track')
            .send({
                data: {
                    type: "belongs-to-race-track",
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(TrackLayout, 'createBelongsToRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/track-layouts/123/relationships/belongs-to-race-track')
            .send({
                data: {
                    type: "belongs-to-race-track",
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(TrackLayout, 'createBelongsToRaceTrackRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('belongs-to-race-track', 123, 567)
            })

        const response = await request(app)
            .post('/track-layouts/123/relationships/belongs-to-race-track')
            .send({
                data: {
                    type: ControllerNodeType.RaceTrack,
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(304)
    })
})
