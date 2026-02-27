import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingEvent} from "../../../../../src/models/node-types/racing-events/RacingEvent"
import {FakeRacingEvent} from "../../../../_toolbox/fixtures/nodes/FakeRacingEvent"

test('Input data is valid', async () => {
    RacingEvent.create = vi.fn().mockReturnValue(FakeRacingEvent.modelOutput)

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
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    RacingEvent.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/racing-events')
        .send({
            name: "GP Monaco 2025",
        })

    expect(response.statusCode)
        .toBe(500)
})
