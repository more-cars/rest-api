import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Brand} from "../../../../../src/models/brands/Brand"

test('Expecting error when node does not exist', async () => {
    Brand.delete = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .delete('/brands/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Deleting node when it actually exists', async () => {
    Brand.delete = vi.fn().mockReturnValue(true)

    const response = await request(app)
        .delete('/brands/12345')

    expect(response.statusCode)
        .toBe(204)
})
