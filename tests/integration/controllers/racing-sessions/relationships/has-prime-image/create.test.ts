import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingSession} from "../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('Providing valid data', async () => {
        RacingSession.createHasPrimeImageRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.RacingSessionHasPrimeImage,
        })

        const response = await request(app)
            .post('/racing-sessions/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingSession, 'createHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/racing-sessions/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingSession, 'createHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/racing-sessions/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RacingSession, 'createHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('has-prime-image', 123, 567)
            })

        const response = await request(app)
            .post('/racing-sessions/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
