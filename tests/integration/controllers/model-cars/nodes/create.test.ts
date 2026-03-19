import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {ModelCar} from "../../../../../src/models/node-types/model-cars/ModelCar"
import {FakeModelCar} from "../../../../_toolbox/fixtures/nodes/FakeModelCar"

test('Input data is valid', async () => {
    ModelCar.create = vi.fn().mockReturnValue(FakeModelCar.modelOutput)

    const response = await request(app)
        .post('/model-cars')
        .send({
            name: "BMW 2002",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/model-cars')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/model-cars') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    ModelCar.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/model-cars')
        .send({
            name: "BMW 2002",
        })

    expect(response.statusCode)
        .toBe(500)
})
