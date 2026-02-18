import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingSeries} from "../../../../../src/models/node-types/racing-series/RacingSeries"

test('Input data is valid', async () => {
    RacingSeries.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "Formula 1",
    })

    const response = await request(app)
        .post('/racing-series')
        .send({
            name: "Formula 1",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/racing-series')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/racing-series') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    RacingSeries.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/racing-series')
        .send({
            name: "Formula 1",
        })

    expect(response.statusCode)
        .toBe(500)
})
