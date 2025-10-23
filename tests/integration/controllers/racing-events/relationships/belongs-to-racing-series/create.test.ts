import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

describe('Creating a ›belongs-to-racing-series‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingEvent.createBelongsToRacingSeriesRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'belongs-to-racing-series',
        })

        const response = await request(app)
            .post('/racing-events/123/belongs-to-racing-series/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingEvent, 'createBelongsToRacingSeriesRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/racing-events/123/belongs-to-racing-series/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingEvent, 'createBelongsToRacingSeriesRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/racing-events/123/belongs-to-racing-series/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RacingEvent, 'createBelongsToRacingSeriesRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('belongs-to-racing-series', 123, 567)
            })

        const response = await request(app)
            .post('/racing-events/123/belongs-to-racing-series/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
