import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Rating} from "../../../../../src/models/node-types/ratings/Rating"
import {FakeRating} from "../../../../_toolbox/fixtures/nodes/FakeRating"

test('Input data is valid', async () => {
    Rating.create = vi.fn().mockReturnValue(FakeRating.modelOutput)

    const response = await request(app)
        .post('/ratings')
        .send({
            rating_value: 93,
            scale_minimum: 0,
            scale_maximum: 100,
            scale_direction: "up",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/ratings')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/ratings') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    Rating.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/ratings')
        .send({
            rating_value: 93,
            scale_minimum: 0,
            scale_maximum: 100,
            scale_direction: "up",
        })

    expect(response.statusCode)
        .toBe(500)
})
