import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingGame} from "../../../../../src/models/node-types/racing-games/RacingGame"
import {FakeRacingGame} from "../../../../_toolbox/fixtures/nodes/FakeRacingGame"

test('Input data is valid', async () => {
    RacingGame.create = vi.fn().mockReturnValue(FakeRacingGame.modelOutput)

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
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    RacingGame.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/racing-games')
        .send({
            name: "Forza Motorsport 7",
        })

    expect(response.statusCode)
        .toBe(500)
})
