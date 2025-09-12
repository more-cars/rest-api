import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Brand} from "../../../../../src/models/brands/Brand"

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/brands')
        .send({}) // mandatory field is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input data is semantically invalid', async () => {
    const response = await request(app)
        .post('/brands') // payload is completely missing

    expect(response.statusCode)
        .toBe(422)
})

test('Input data is valid', async () => {
    Brand.create = vi.fn().mockReturnValue({
        id: 12345,
        name: "dummy",
    })

    const response = await request(app)
        .post('/brands')
        .send({
            name: 'dummy',
        })

    expect(response.statusCode)
        .toBe(201)
})
