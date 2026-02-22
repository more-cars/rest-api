import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {TrackLayout} from "../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Creating a ›has-lap-time‹ relationship', () => {
    test('Providing valid data', async () => {
        TrackLayout.createHasLapTimeRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.TrackLayoutHasLapTime))

        const response = await request(app)
            .post('/track-layouts/123/has-lap-time/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(TrackLayout, 'createHasLapTimeRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/track-layouts/123/has-lap-time/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(TrackLayout, 'createHasLapTimeRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/track-layouts/123/has-lap-time/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(TrackLayout, 'createHasLapTimeRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('has-lap-time', 123, 567)
            })

        const response = await request(app)
            .post('/track-layouts/123/has-lap-time/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
