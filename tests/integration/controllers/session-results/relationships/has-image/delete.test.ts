import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {SessionResult} from "../../../../../../src/models/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('Providing valid data', async () => {
        SessionResult.deleteHasImageRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/session-results/123/has-image/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(SessionResult, 'deleteHasImageRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/session-results/123/has-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(SessionResult, 'deleteHasImageRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('has-image', 123, 567)
            })

        const response = await request(app)
            .delete('/session-results/123/has-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(SessionResult, 'deleteHasImageRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/session-results/123/has-image/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
