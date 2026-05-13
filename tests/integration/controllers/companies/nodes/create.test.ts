import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Company} from "../../../../../src/models/node-types/companies/Company"
import {FakeCompany} from "../../../../_toolbox/fixtures/nodes/FakeCompany"

test('Input data is valid', async () => {
    Company.create = vi.fn().mockReturnValue(FakeCompany.modelOutput())

    const response = await request(app)
        .post('/companies')
        .send({
            name: "BMW AG",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/companies')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/companies') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    Company.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/companies')
        .send({
            name: "BMW AG",
        })

    expect(response.statusCode)
        .toBe(500)
})
