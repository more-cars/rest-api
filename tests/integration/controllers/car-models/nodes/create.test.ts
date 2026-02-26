import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"

test('Input data is valid', async () => {
    CarModel.create = vi.fn().mockReturnValue(FakeCarModel.modelOutput())

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

test('Input is valid, but something breaks on the way', async () => {
    CarModel.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/car-models')
        .send({
            name: 'Testarossa',
        })

    expect(response.statusCode)
        .toBe(500)
})
