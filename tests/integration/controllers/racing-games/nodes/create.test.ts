import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingGame} from "../../../../../src/models/racing-games/RacingGame"

test('Input data is valid', async () => {
    RacingGame.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "Forza Motorsport 7",
    })

    const response = await request(app)
        .post('/racing-games')
        .send({
            name: "Forza Motorsport 7",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/racing-games')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/racing-games') // payload is missing

    expect(response.statusCode)
        .toBe(500)
})
