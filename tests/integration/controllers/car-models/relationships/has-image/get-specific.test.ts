import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting a specific ›has-image‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModel.getSpecificHasImageRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.CarModelHasImage,
        })

        const response = await request(app)
            .get('/car-models/123/has-image/567')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing invalid data (nodes do not exist)', async () => {
        vi.spyOn(CarModel, 'getSpecificHasImageRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/car-models/123/has-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (relationship does not exist)', async () => {
        vi.spyOn(CarModel, 'getSpecificHasImageRelationship')
            .mockImplementation(async () => {
                throw new RelationshipNotFoundError('has-image', 123)
            })

        const response = await request(app)
            .get('/car-models/123/has-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModel, 'getSpecificHasImageRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/car-models/123/has-image/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
