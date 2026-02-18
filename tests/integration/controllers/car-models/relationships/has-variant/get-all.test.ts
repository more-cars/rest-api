import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting all ›has-variant‹ relationships', () => {
    test('Providing valid data', async () => {
        CarModel.getAllHasVariantRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelationshipType.CarModelHasVariant,
            }, {
                id: 5,
                type: RelationshipType.CarModelHasVariant,
            }, {
                id: 6,
                type: RelationshipType.CarModelHasVariant,
            }
        ])

        const response = await request(app)
            .get('/car-models/123/has-variant')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        CarModel.getAllHasVariantRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/car-models/123/has-variant')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModel, 'getAllHasVariantRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/car-models/123/has-variant')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModel, 'getAllHasVariantRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/car-models/123/has-variant')

        expect(response.statusCode)
            .toBe(404)
    })
})
