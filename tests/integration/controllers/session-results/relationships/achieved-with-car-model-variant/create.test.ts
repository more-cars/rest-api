import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {SessionResult} from "../../../../../../src/models/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

describe('Creating a ›achieved-with-car-model-variant‹ relationship', () => {
    test('Providing valid data', async () => {
        SessionResult.createAchievedWithCarModelVariantRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'achieved-with-car-model-variant',
        })

        const response = await request(app)
            .post('/session-results/123/achieved-with-car-model-variant/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(SessionResult, 'createAchievedWithCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/session-results/123/achieved-with-car-model-variant/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(SessionResult, 'createAchievedWithCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/session-results/123/achieved-with-car-model-variant/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(SessionResult, 'createAchievedWithCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('achieved-with-car-model-variant', 123, 567)
            })

        const response = await request(app)
            .post('/session-results/123/achieved-with-car-model-variant/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
