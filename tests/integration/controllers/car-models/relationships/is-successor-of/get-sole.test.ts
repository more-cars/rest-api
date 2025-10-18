import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting the ›is-successor-of‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModel.getIsSuccessorOfRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'is-successor-of',
        })

        const response = await request(app)
            .get('/car-models/123/is-successor-of')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(CarModel, 'getIsSuccessorOfRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('is successor of', 123)
            })

        const response = await request(app)
            .get('/car-models/123/is-successor-of')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModel, 'getIsSuccessorOfRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/car-models/123/is-successor-of')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModel, 'getIsSuccessorOfRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/car-models/123/is-successor-of')

        expect(response.statusCode)
            .toBe(404)
    })
})
