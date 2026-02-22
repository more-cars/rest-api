import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingSeries} from "../../../../../../src/models/node-types/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Creating a ›has-racing-event‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingSeries.createHasRacingEventRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.RacingSeriesHasRacingEvent))

        const response = await request(app)
            .post('/racing-series/123/has-racing-event/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingSeries, 'createHasRacingEventRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/racing-series/123/has-racing-event/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingSeries, 'createHasRacingEventRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/racing-series/123/has-racing-event/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RacingSeries, 'createHasRacingEventRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('has-racing-event', 123, 567)
            })

        const response = await request(app)
            .post('/racing-series/123/has-racing-event/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
