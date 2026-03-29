import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {VideoController} from "../../../src/controllers/node-types/VideoController"

describe('Videos', () => {
    vi.mock("../../../src/controllers/node-types/VideoController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/videos')

        expect(VideoController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/videos/123')

        expect(VideoController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/videos')

        expect(VideoController.getAll)
            .toHaveBeenCalledTimes(1)
    })
})
