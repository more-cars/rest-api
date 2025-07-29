import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Image} from "../../../../../src/models/images/Image"

test('No nodes exist', async () => {
    Image.findAll = vi.fn().mockReturnValue([])

    const response = await request(app)
        .get('/images')

    expect(response.statusCode)
        .toBe(200)
})

test('Multiple nodes exist', async () => {
    Image.findAll = vi.fn().mockReturnValue([
        {
            id: 1,
            name: "dummy",
        }, {
            id: 2,
            name: "dummy",
        }, {
            id: 3,
            name: "dummy",
        }
    ])

    const response = await request(app)
        .get('/images')

    expect(response.statusCode)
        .toBe(200)
})
