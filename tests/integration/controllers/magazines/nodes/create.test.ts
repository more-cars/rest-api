import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Magazine} from "../../../../../src/models/node-types/magazines/Magazine"
import {FakeMagazine} from "../../../../_toolbox/fixtures/nodes/FakeMagazine"

test('Input data is valid', async () => {
    Magazine.create = vi.fn().mockReturnValue(FakeMagazine.modelOutput)

    const response = await request(app)
        .post('/magazines')
        .send({
            name: "Top Gear",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/magazines')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/magazines') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    Magazine.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/magazines')
        .send({
            name: "Top Gear",
        })

    expect(response.statusCode)
        .toBe(500)
})
