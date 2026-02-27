import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {TrackLayout} from "../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {FakeTrackLayout} from "../../../../../_toolbox/fixtures/nodes/FakeTrackLayout"

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
            FakeTrackLayout.modelOutput,
            FakeTrackLayout.modelOutput,
            FakeTrackLayout.modelOutput,
        ])

        const response = await request(app)
            .get('/track-layouts')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        TrackLayout.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/track-layouts')

        expect(response.statusCode)
            .toBe(500)
    })
})
