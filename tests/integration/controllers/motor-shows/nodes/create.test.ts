import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {MotorShow} from "../../../../../src/models/node-types/motor-shows/MotorShow"
import {FakeMotorShow} from "../../../../_toolbox/fixtures/nodes/FakeMotorShow"

test('Input data is valid', async () => {
    MotorShow.create = vi.fn().mockReturnValue(FakeMotorShow.modelOutput)

    const response = await request(app)
        .post('/motor-shows')
        .send({
            name: "2017 IAA Frankfurt",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/motor-shows')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/motor-shows') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    MotorShow.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/motor-shows')
        .send({
            name: "2017 IAA Frankfurt",
        })

    expect(response.statusCode)
        .toBe(500)
})
