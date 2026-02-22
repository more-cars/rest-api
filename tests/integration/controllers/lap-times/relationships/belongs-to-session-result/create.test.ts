import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {LapTime} from "../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"

describe('Creating a ›belongs-to-session-result‹ relationship', () => {
    test('Providing valid data', async () => {
        LapTime.createBelongsToSessionResultRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.LapTimeBelongsToSessionResult))

        const response = await request(app)
            .post('/lap-times/123/belongs-to-session-result/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(LapTime, 'createBelongsToSessionResultRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/lap-times/123/belongs-to-session-result/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(LapTime, 'createBelongsToSessionResultRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/lap-times/123/belongs-to-session-result/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(LapTime, 'createBelongsToSessionResultRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('belongs-to-session-result', 123, 567)
            })

        const response = await request(app)
            .post('/lap-times/123/belongs-to-session-result/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
