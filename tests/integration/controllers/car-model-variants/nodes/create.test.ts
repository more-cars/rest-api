import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModelVariant} from "../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {FakeCarModelVariant} from "../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"

test('Input data is valid', async () => {
    CarModelVariant.create = vi.fn().mockReturnValue(FakeCarModelVariant.modelOutput())

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

test('Input is valid, but something breaks on the way', async () => {
    CarModelVariant.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/car-model-variants')
        .send({
            name: "BMW M3",
        })

    expect(response.statusCode)
        .toBe(500)
})
