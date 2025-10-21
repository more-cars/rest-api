import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RaceTrack} from "../../../../../../src/models/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('Providing valid data', async () => {
        RaceTrack.createHasPrimeImageRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'has-prime-image',
        })

        const response = await request(app)
            .post('/race-tracks/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RaceTrack, 'createHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/race-tracks/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RaceTrack, 'createHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/race-tracks/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(RaceTrack, 'createHasPrimeImageRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('has-prime-image', 123, 567)
            })

        const response = await request(app)
            .post('/race-tracks/123/has-prime-image/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
