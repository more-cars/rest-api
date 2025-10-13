import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-car-model‹ relationships', () => {
    test('Providing valid data', async () => {
        Brand.getAllHasCarModelRelationships = vi.fn().mockReturnValue([
            {
                relationship_id: 4,
                relationship_name: 'has-car-model',
            }, {
                relationship_id: 5,
                relationship_name: 'has-car-model',
            }, {
                relationship_id: 6,
                relationship_name: 'has-car-model',
            }
        ])

        CarModel.findById = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .get('/brands/123/has-car-model')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Brand.getAllHasCarModelRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/brands/123/has-car-model')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Brand, 'getAllHasCarModelRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/brands/123/has-car-model')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Brand, 'getAllHasCarModelRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/brands/123/has-car-model')

        expect(response.statusCode)
            .toBe(404)
    })
})
