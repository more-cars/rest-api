import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModel} from "../../../../../src/models/car-models/CarModel"

test('Input data is valid', async () => {
    CarModel.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "Testarossa",
    })

    const response = await request(app)
        .post('/car-models')
        .send({
            name: 'Testarossa',
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/car-models')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/car-models') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})
