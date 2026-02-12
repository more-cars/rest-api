import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingEvent} from "../../../../../src/models/racing-events/RacingEvent"

test('Input data is valid', async () => {
    RacingEvent.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "GP Monaco 2025",
    })

    const response = await request(app)
        .post('/racing-events')
        .send({
            name: "GP Monaco 2025",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/racing-events')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/racing-events') // payload is missing

    expect(response.statusCode)
        .toBe(500)
})


