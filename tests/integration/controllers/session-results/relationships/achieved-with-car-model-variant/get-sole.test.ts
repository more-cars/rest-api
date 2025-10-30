import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {SessionResult} from "../../../../../../src/models/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting the ›achieved-with-car-model-variant‹ relationship', () => {
    test('Providing valid data', async () => {
        SessionResult.getAchievedWithCarModelVariantRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'achieved-with-car-model-variant',
        })

        const response = await request(app)
            .get('/session-results/123/achieved-with-car-model-variant')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(SessionResult, 'getAchievedWithCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('achieved with car model variant', 123)
            })

        const response = await request(app)
            .get('/session-results/123/achieved-with-car-model-variant')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(SessionResult, 'getAchievedWithCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/session-results/123/achieved-with-car-model-variant')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(SessionResult, 'getAchievedWithCarModelVariantRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/session-results/123/achieved-with-car-model-variant')

        expect(response.statusCode)
            .toBe(404)
    })
})
