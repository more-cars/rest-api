import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingSeries} from "../../../../../../src/models/node-types/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-racing-event‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingSeries.deleteHasRacingEventRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/racing-series/123/has-racing-event/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(RacingSeries, 'deleteHasRacingEventRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/racing-series/123/has-racing-event/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(RacingSeries, 'deleteHasRacingEventRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('has-racing-event', 123, 567)
            })

        const response = await request(app)
            .delete('/racing-series/123/has-racing-event/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingSeries, 'deleteHasRacingEventRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/racing-series/123/has-racing-event/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
