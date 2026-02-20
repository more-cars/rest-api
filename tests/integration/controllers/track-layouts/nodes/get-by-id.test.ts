import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {TrackLayout} from "../../../../../src/models/node-types/track-layouts/TrackLayout"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"

test('Node does not exist', async () => {
    TrackLayout.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/track-layouts/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    TrackLayout.findById = vi.fn().mockReturnValue({
        node_type: ModelNodeType.TrackLayout,
        attributes: {
            id: 12345,
        },
    })

    const response = await request(app)
        .get('/track-layouts/12345')

    expect(response.statusCode)
        .toBe(200)
})
