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

    test('Delete Node', async () => {
        await request(app)
            .delete('/videos/123')

        expect(VideoController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›belongs-to-node‹ relationship', async () => {
        await request(app)
            .post('/videos/123/belongs-to-node/456')

        expect(VideoController.createBelongsToNodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›belongs-to-node‹ relationships', async () => {
        await request(app)
            .get('/videos/123/belongs-to-node')

        expect(VideoController.getAllBelongsToNodeRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-node‹ relationship', async () => {
        await request(app)
            .delete('/videos/123/belongs-to-node/456')

        expect(VideoController.deleteBelongsToNodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›is-main-video-of-node‹ relationship', async () => {
        await request(app)
            .post('/videos/123/is-main-video-of-node/456')

        expect(VideoController.createIsMainVideoOfNodeRelation)
            .toHaveBeenCalledTimes(1)
    })
})
