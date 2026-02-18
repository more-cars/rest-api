import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Creating a ›achieved-session-result‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModelVariant.createAchievedSessionResultRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.CarModelVariantAchievedSessionResult,
        })

        const response = await request(app)
            .post('/car-model-variants/123/achieved-session-result/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModelVariant, 'createAchievedSessionResultRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/car-model-variants/123/achieved-session-result/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModelVariant, 'createAchievedSessionResultRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/car-model-variants/123/achieved-session-result/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(CarModelVariant, 'createAchievedSessionResultRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('achieved-session-result', 123, 567)
            })

        const response = await request(app)
            .post('/car-model-variants/123/achieved-session-result/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
