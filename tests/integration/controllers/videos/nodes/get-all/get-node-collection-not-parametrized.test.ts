import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {Video} from "../../../../../../src/models/node-types/videos/Video"
import {FakeVideo} from "../../../../../_toolbox/fixtures/nodes/FakeVideo"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        Video.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/videos')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        Video.findAll = vi.fn().mockReturnValue([
            FakeVideo.modelOutput,
            FakeVideo.modelOutput,
            FakeVideo.modelOutput,
        ])

        const response = await request(app)
            .get('/videos')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Video.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/videos')

        expect(response.statusCode)
            .toBe(500)
    })
})
