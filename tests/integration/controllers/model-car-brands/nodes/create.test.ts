import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {ModelCarBrand} from "../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {FakeModelCarBrand} from "../../../../_toolbox/fixtures/nodes/FakeModelCarBrand"

test('Input data is valid', async () => {
    ModelCarBrand.create = vi.fn().mockReturnValue(FakeModelCarBrand.modelOutput)

    const response = await request(app)
        .post('/model-car-brands')
        .send({
            name: "Hot Wheels",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/model-car-brands')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/model-car-brands') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    ModelCarBrand.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/model-car-brands')
        .send({
            name: "Hot Wheels",
        })

    expect(response.statusCode)
        .toBe(500)
})
