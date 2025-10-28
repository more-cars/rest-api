import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {TrackLayout} from "../../../../../../src/models/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›has-lap-time‹ relationship', () => {
    test('Providing valid data', async () => {
        TrackLayout.deleteHasLapTimeRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/track-layouts/123/has-lap-time/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(TrackLayout, 'deleteHasLapTimeRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/track-layouts/123/has-lap-time/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(TrackLayout, 'deleteHasLapTimeRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('has-lap-time', 123, 567)
            })

        const response = await request(app)
            .delete('/track-layouts/123/has-lap-time/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(TrackLayout, 'deleteHasLapTimeRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/track-layouts/123/has-lap-time/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
