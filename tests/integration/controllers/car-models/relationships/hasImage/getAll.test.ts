import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/car-models/CarModel"

test('Node does not exist', async () => {
    vi.spyOn(CarModel, 'getRelationshipsForHasImage')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .get('/car-models/567/has-image')

    expect(response.statusCode)
        .toBe(404)
})

test('Node exists and has relationship partners', async () => {
    CarModel.getRelationshipsForHasImage = vi.fn().mockReturnValue([
        {
            relationship_id: 4,
            relationship_name: 'has-image',
        }, {
            relationship_id: 5,
            relationship_name: 'has-image',
        }, {
            relationship_id: 6,
            relationship_name: 'has-image',
        }
    ])

    const response = await request(app)
        .get('/car-models/567/has-image')

    expect(response.statusCode)
        .toBe(200)
})
