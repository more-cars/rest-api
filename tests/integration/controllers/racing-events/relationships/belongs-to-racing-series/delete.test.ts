import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›belongs-to-racing-series‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingEvent.deleteBelongsToRacingSeriesRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/racing-events/123/belongs-to-racing-series/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(RacingEvent, 'deleteBelongsToRacingSeriesRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/racing-events/123/belongs-to-racing-series/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(RacingEvent, 'deleteBelongsToRacingSeriesRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('belongs-to-racing-series', 123, 567)
            })

        const response = await request(app)
            .delete('/racing-events/123/belongs-to-racing-series/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'deleteBelongsToRacingSeriesRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/racing-events/123/belongs-to-racing-series/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
