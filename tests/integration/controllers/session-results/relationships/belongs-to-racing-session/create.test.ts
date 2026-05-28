import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {SessionResult} from "../../../../../../src/models/node-types/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

describe('Creating a ›belongs-to-racing-session‹ relationship', () => {
    test('Providing valid data', async () => {
        SessionResult.createBelongsToRacingSessionRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.SessionResultBelongsToRacingSession))

        const response = await request(app)
            .post('/session-results/123/relationships/belongs-to-racing-session')
            .send({
                data: {
                    type: ControllerNodeType.RacingSession,
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(SessionResult, 'createBelongsToRacingSessionRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/session-results/123/relationships/belongs-to-racing-session')
            .send({
                data: {
                    type: "belongs-to-racing-session",
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(SessionResult, 'createBelongsToRacingSessionRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/session-results/123/relationships/belongs-to-racing-session')
            .send({
                data: {
                    type: "belongs-to-racing-session",
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(SessionResult, 'createBelongsToRacingSessionRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('belongs-to-racing-session', 123, 567)
            })

        const response = await request(app)
            .post('/session-results/123/relationships/belongs-to-racing-session')
            .send({
                data: {
                    type: ControllerNodeType.RacingSession,
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(304)
    })
})
