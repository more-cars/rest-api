import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {SessionResult} from "../../../../../src/models/node-types/session-results/SessionResult"
import {FakeSessionResult} from "../../../../_toolbox/fixtures/nodes/FakeSessionResult"

test('Input data is valid', async () => {
    SessionResult.create = vi.fn().mockReturnValue(FakeSessionResult.modelOutput())

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
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    SessionResult.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/session-results')
        .send({
            position: 1,
            driver_name: "Lewis Hamilton",
        })

    expect(response.statusCode)
        .toBe(500)
})
