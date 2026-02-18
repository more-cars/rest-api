import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›achieved-session-result‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModelVariant.deleteAchievedSessionResultRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/car-model-variants/123/achieved-session-result/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(CarModelVariant, 'deleteAchievedSessionResultRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/car-model-variants/123/achieved-session-result/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(CarModelVariant, 'deleteAchievedSessionResultRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('achieved-session-result', 123, 567)
            })

        const response = await request(app)
            .delete('/car-model-variants/123/achieved-session-result/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModelVariant, 'deleteAchievedSessionResultRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/car-model-variants/123/achieved-session-result/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
