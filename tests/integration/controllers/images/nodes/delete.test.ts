import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Image} from "../../../../../src/models/images/Image"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

test('Expecting error when node does not exist', async () => {
    vi.spyOn(Image, 'delete')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(-42)
        })

    const response = await request(app)
        .delete('/images/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Deleting node when it actually exists', async () => {
    Image.delete = vi.fn().mockReturnValue(true)

    const response = await request(app)
        .delete('/images/12345')

    expect(response.statusCode)
        .toBe(204)
})
