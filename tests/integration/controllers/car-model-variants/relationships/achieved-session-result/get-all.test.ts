import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModelVariant} from "../../../../../../src/models/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›achieved-session-result‹ relationships', () => {
    test('Providing valid data', async () => {
        CarModelVariant.getAllAchievedSessionResultRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: 'achieved-session-result',
            }, {
                id: 5,
                type: 'achieved-session-result',
            }, {
                id: 6,
                type: 'achieved-session-result',
            }
        ])

        const response = await request(app)
            .get('/car-model-variants/123/achieved-session-result')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        CarModelVariant.getAllAchievedSessionResultRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/car-model-variants/123/achieved-session-result')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModelVariant, 'getAllAchievedSessionResultRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/car-model-variants/123/achieved-session-result')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModelVariant, 'getAllAchievedSessionResultRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/car-model-variants/123/achieved-session-result')

        expect(response.statusCode)
            .toBe(404)
    })
})
