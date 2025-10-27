import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingSession} from "../../../../../src/models/racing-sessions/RacingSession"

test('Input data is valid', async () => {
    RacingSession.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "Grand Prix",
    })

    const response = await request(app)
        .post('/racing-sessions')
        .send({
            name: "Grand Prix",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/racing-sessions')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input data is semantically invalid', async () => {
    const response = await request(app)
        .post('/racing-sessions') // payload is missing

    expect(response.statusCode)
        .toBe(500)
})


