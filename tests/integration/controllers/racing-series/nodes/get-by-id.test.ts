import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {RacingSeries} from "../../../../../src/models/node-types/racing-series/RacingSeries"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"

test('Node does not exist', async () => {
    RacingSeries.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/racing-series/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    RacingSeries.findById = vi.fn().mockReturnValue({
        node_type: ModelNodeType.RacingSeries,
        attributes: {
            id: 12345,
        },
    })

    const response = await request(app)
        .get('/racing-series/12345')

    expect(response.statusCode)
        .toBe(200)
})
