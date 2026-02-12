import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {SessionResult} from "../../../../../src/models/session-results/SessionResult"

test('Input data is valid', async () => {
    SessionResult.create = vi.fn().mockReturnValue({
        id: 12345,
        position: 1,
        driver_name: "Lewis Hamilton",
    })

    const response = await request(app)
        .post('/session-results')
        .send({
            position: 1,
            driver_name: "Lewis Hamilton",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/session-results')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/session-results') // payload is missing

    expect(response.statusCode)
        .toBe(500)
})


