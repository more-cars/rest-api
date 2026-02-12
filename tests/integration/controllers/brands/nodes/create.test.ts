import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Brand} from "../../../../../src/models/brands/Brand"

test('Input data is valid', async () => {
    Brand.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "BMW",
    })

    const response = await request(app)
        .post('/brands')
        .send({
            name: 'BMW',
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/brands')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/brands') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    Brand.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/brands')
        .send({
            name: 'BMW',
        })

    expect(response.statusCode)
        .toBe(500)
})
