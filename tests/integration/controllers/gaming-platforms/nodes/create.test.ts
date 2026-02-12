import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {GamingPlatform} from "../../../../../src/models/gaming-platforms/GamingPlatform"

test('Input data is valid', async () => {
    GamingPlatform.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "PlayStation 5",
    })

    const response = await request(app)
        .post('/gaming-platforms')
        .send({
            name: "PlayStation 5",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/gaming-platforms')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/gaming-platforms') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    GamingPlatform.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/gaming-platforms')
        .send({
            name: "PlayStation 5",
        })

    expect(response.statusCode)
        .toBe(500)
})
