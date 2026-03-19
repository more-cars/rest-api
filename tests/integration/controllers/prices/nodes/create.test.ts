import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Price} from "../../../../../src/models/node-types/prices/Price"
import {FakePrice} from "../../../../_toolbox/fixtures/nodes/FakePrice"

test('Input data is valid', async () => {
    Price.create = vi.fn().mockReturnValue(FakePrice.modelOutput)

    const response = await request(app)
        .post('/prices')
        .send({
            price: 59990,
            currency_code: "EUR",
            country_code: "DE",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/prices')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/prices') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    Price.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/prices')
        .send({
            price: 59990,
            currency_code: "EUR",
            country_code: "DE",
        })

    expect(response.statusCode)
        .toBe(500)
})
