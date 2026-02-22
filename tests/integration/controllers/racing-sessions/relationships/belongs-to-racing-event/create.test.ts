import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingSession} from "../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Creating a ›belongs-to-racing-event‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingSession.createBelongsToRacingEventRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.RacingSessionBelongsToRacingEvent))

        const response = await request(app)
            .post('/racing-sessions/123/belongs-to-racing-event/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingSession, 'createBelongsToRacingEventRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/racing-sessions/123/belongs-to-racing-event/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingSession, 'createBelongsToRacingEventRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/racing-sessions/123/belongs-to-racing-event/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RacingSession, 'createBelongsToRacingEventRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('belongs-to-racing-event', 123, 567)
            })

        const response = await request(app)
            .post('/racing-sessions/123/belongs-to-racing-event/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
