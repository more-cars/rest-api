import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModelVariant} from "../../../../../src/models/car-model-variants/CarModelVariant"

test('Input data is valid', async () => {
    CarModelVariant.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "BMW M3",
    })

    const response = await request(app)
        .post('/car-model-variants')
        .send({
            name: "BMW M3",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/car-model-variants')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/car-model-variants') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})


