import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {Image} from "../../../../../../src/models/images/Image"

test('CAR MODEL and/or IMAGE does not exist', async () => {
    vi.spyOn(CarModel, 'getSpecificHasImageRelationship')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .get('/car-models/1234/has-image/5678')

    expect(response.statusCode)
        .toBe(404)
})

test('CAR MODEL exists and has relationship partner', async () => {
    CarModel.getSpecificHasImageRelationship = vi.fn().mockReturnValue({
        relationship_id: 4,
        relationship_name: 'has-image',
    })

    Image.findById = vi.fn().mockReturnValue(null)

    const response = await request(app)
        .get('/car-models/1234/has-image/5678')

    expect(response.statusCode)
        .toBe(200)
})

test('CAR MODEL exists, but has no relationship partner', async () => {
    CarModel.getSpecificHasImageRelationship = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/car-models/1234/has-image/5678')

    expect(response.statusCode)
        .toBe(404)
})
