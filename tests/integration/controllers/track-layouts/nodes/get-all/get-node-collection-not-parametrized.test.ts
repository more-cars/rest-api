import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {TrackLayout} from "../../../../../../src/models/track-layouts/TrackLayout"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        TrackLayout.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/track-layouts')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        TrackLayout.findAll = vi.fn().mockReturnValue([
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
            .get('/track-layouts')

        expect(response.statusCode)
            .toBe(200)
    })
})
