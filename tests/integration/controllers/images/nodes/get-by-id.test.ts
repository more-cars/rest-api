import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"

test('Node does not exist', async () => {
    Image.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/images/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    Image.findById = vi.fn().mockReturnValue({
        node_type: ModelNodeType.Image,
        attributes: {
            id: 12345,
        },
    })

    const response = await request(app)
        .get('/images/12345')

    expect(response.statusCode)
        .toBe(200)
})
