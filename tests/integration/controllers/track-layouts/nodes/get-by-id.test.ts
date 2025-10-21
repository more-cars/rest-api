import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {TrackLayout} from "../../../../../src/models/track-layouts/TrackLayout"

test('Node does not exist', async () => {
    TrackLayout.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/track-layouts/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    TrackLayout.findById = vi.fn().mockReturnValue({
        id: 12345
    })

    const response = await request(app)
        .get('/track-layouts/12345')

    expect(response.statusCode)
        .toBe(200)
})
