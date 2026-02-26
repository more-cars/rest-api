import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingSession} from "../../../../../src/models/node-types/racing-sessions/RacingSession"
import {FakeRacingSession} from "../../../../_toolbox/fixtures/nodes/FakeRacingSession"

test('Input data is valid', async () => {
    RacingSession.create = vi.fn().mockReturnValue(FakeRacingSession.modelOutput())

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

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/racing-sessions') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    RacingSession.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/racing-sessions')
        .send({
            name: "Grand Prix",
        })

    expect(response.statusCode)
        .toBe(500)
})
