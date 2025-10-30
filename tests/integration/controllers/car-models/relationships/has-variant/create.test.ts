import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

describe('Creating a ›has-variant‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModel.createHasVariantRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'has-variant',
        })

        const response = await request(app)
            .post('/car-models/123/has-variant/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModel, 'createHasVariantRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/car-models/123/has-variant/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModel, 'createHasVariantRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/car-models/123/has-variant/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(CarModel, 'createHasVariantRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('has-variant', 123, 567)
            })

        const response = await request(app)
            .post('/car-models/123/has-variant/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
