import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingSession} from "../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingSession.deleteHasPrimeImageRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/racing-sessions/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(RacingSession, 'deleteHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/racing-sessions/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(RacingSession, 'deleteHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('has-prime-image', 123, 567)
            })

        const response = await request(app)
            .delete('/racing-sessions/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingSession, 'deleteHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/racing-sessions/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
