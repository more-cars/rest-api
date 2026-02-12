import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {TrackLayout} from "../../../../../src/models/track-layouts/TrackLayout"

test('Input data is valid', async () => {
    TrackLayout.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "GP Circuit",
    })

    const response = await request(app)
        .post('/track-layouts')
        .send({
            name: "GP Circuit",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/track-layouts')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/track-layouts') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    TrackLayout.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/track-layouts')
        .send({
            name: "GP Circuit",
        })

    expect(response.statusCode)
        .toBe(500)
})
