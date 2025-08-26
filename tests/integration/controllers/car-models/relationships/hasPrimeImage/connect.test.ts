import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/car-models/CarModel"

test('One of the nodes does not exist', async () => {
    CarModel.createHasPrimeImageRelationship = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .post('/car-models/123/has-prime-image/567')

    expect(response.statusCode)
        .toBe(404)
})

test('Both nodes are from the same type', async () => {
    vi.spyOn(CarModel, 'createHasPrimeImageRelationship')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .post('/car-models/123/has-prime-image/123')

    expect(response.statusCode)
        .toBe(500)
})

test('Both nodes exist and are valid relationship partners', async () => {
    CarModel.createHasPrimeImageRelationship = vi.fn().mockReturnValue({
        relationship_id: 4
    })

    const response = await request(app)
        .post('/car-models/123/has-prime-image/567')

    expect(response.statusCode)
        .toBe(201)
})
