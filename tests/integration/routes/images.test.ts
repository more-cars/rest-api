import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {ImageController} from "../../../src/controllers/ImageController"

describe('Images', () => {
    vi.mock("../../../src/controllers/ImageController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/images')

        expect(ImageController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/images/123')

        expect(ImageController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/images')

        expect(ImageController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/images/123')

        expect(ImageController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create "belongs to Node" Relationship', async () => {
        await request(app)
            .post('/images/123/belongs-to-node/456')

        expect(ImageController.createBelongsToNodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "belongs to Node" Relationship', async () => {
        await request(app)
            .get('/images/123/belongs-to-node/456')

        expect(ImageController.getSpecificBelongsToNodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "belongs to Node" Relationships', async () => {
        await request(app)
            .get('/images/123/belongs-to-node')

        expect(ImageController.getAllBelongsToNodeRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "belongs to Node type" Relationships', async () => {
        await request(app)
            .get('/images/123/belongs-to-node-type')

        expect(ImageController.getAllBelongsToNodeTypeRelations)
            .toHaveBeenCalledTimes(1)
    })
})
