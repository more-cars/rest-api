import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"
import {CarModel} from "../../../../../../src/models/car-models/CarModel"

test('Node does not exist', async () => {
    vi.spyOn(Brand, 'getAllHasCarModelRelationships')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .get('/brands/123/has-car-model')

    expect(response.statusCode)
        .toBe(404)
})

test('Node exists and has relationship partners', async () => {
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
