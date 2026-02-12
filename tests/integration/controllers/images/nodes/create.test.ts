import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Image} from "../../../../../src/models/images/Image"

test('Input data is valid', async () => {
    Image.create = vi.fn().mockReturnValue({
        image_provider: 'flickr',
        external_id: '1234',
    })

    const response = await request(app)
        .post('/images')
        .send({
            image_provider: 'flickr',
            external_id: '1234',
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    // all mandatory fields are missing
    let response = await request(app)
        .post('/images')
        .send({})

    expect(response.statusCode)
        .toBe(400)

    // one mandatory field is missing
    response = await request(app)
        .post('/images')
        .send({
            external_id: '1234'
        })

    expect(response.statusCode)
        .toBe(400)

    // the other mandatory field is missing
    response = await request(app)
        .post('/images')
        .send({
            image_provider: 'picci'
        })

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/images') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})
