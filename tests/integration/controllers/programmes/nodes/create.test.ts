import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Programme} from "../../../../../src/models/node-types/programmes/Programme"
import {FakeProgramme} from "../../../../_toolbox/fixtures/nodes/FakeProgramme"

test('Input data is valid', async () => {
    Programme.create = vi.fn().mockReturnValue(FakeProgramme.modelOutput)

    const response = await request(app)
        .post('/programmes')
        .send({
            name: "Top Gear",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/programmes')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/programmes') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    Programme.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/programmes')
        .send({
            name: "Top Gear",
        })

    expect(response.statusCode)
        .toBe(500)
})
