import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Video} from "../../../../../src/models/node-types/videos/Video"
import {FakeVideo} from "../../../../_toolbox/fixtures/nodes/FakeVideo"

test('Input data is valid', async () => {
    Video.create = vi.fn().mockReturnValue(FakeVideo.modelOutput)

    const response = await request(app)
        .post('/videos')
        .send({
            video_provider: "youtube",
            external_id: "NqsBncRslsg",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/videos')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/videos') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    Video.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/videos')
        .send({
            video_provider: "youtube",
            external_id: "NqsBncRslsg",
        })

    expect(response.statusCode)
        .toBe(500)
})
