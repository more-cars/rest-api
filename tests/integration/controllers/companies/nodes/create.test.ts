import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Company} from "../../../../../src/models/companies/Company"

test('Input data is valid', async () => {
    Company.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "BMW AG",
    })

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
        .toBe(500)
})
