import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {LapTime} from "../../../../../../src/models/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting the ›belongs-to-session-result‹ relationship', () => {
    test('Providing valid data', async () => {
        LapTime.getBelongsToSessionResultRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'belongs-to-session-result',
        })

        const response = await request(app)
            .get('/lap-times/123/belongs-to-session-result')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(LapTime, 'getBelongsToSessionResultRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('belongs to session result', 123)
            })

        const response = await request(app)
            .get('/lap-times/123/belongs-to-session-result')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(LapTime, 'getBelongsToSessionResultRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/lap-times/123/belongs-to-session-result')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(LapTime, 'getBelongsToSessionResultRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/lap-times/123/belongs-to-session-result')

        expect(response.statusCode)
            .toBe(404)
    })
})
