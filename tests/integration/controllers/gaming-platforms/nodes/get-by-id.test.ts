import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {GamingPlatform} from "../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

test('Node does not exist', async () => {
    GamingPlatform.findById = vi.fn().mockImplementation(() => {
        throw new NodeNotFoundError(-42)
    })

    const response = await request(app)
        .get('/gaming-platforms/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    GamingPlatform.findById = vi.fn().mockReturnValue({
        node_type: ModelNodeType.GamingPlatform,
        attributes: {
            id: 12345,
        },
    })

    const response = await request(app)
        .get('/gaming-platforms/12345')

    expect(response.statusCode)
        .toBe(200)
})
