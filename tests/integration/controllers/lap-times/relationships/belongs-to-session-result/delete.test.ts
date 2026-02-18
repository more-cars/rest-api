import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {LapTime} from "../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›belongs-to-session-result‹ relationship', () => {
    test('Providing valid data', async () => {
        LapTime.deleteBelongsToSessionResultRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/lap-times/123/belongs-to-session-result/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(LapTime, 'deleteBelongsToSessionResultRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/lap-times/123/belongs-to-session-result/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(LapTime, 'deleteBelongsToSessionResultRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('belongs-to-session-result', 123, 567)
            })

        const response = await request(app)
            .delete('/lap-times/123/belongs-to-session-result/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(LapTime, 'deleteBelongsToSessionResultRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/lap-times/123/belongs-to-session-result/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
