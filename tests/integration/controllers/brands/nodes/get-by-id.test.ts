import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"

test('Node does not exist', async () => {
    Brand.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/brands/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    Brand.findById = vi.fn().mockReturnValue({
        id: 12345,
        name: "dummy",
    })

    const response = await request(app)
        .get('/brands/12345')

    expect(response.statusCode)
        .toBe(200)
})
