import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {ImageController} from "../../../src/controllers/node-types/ImageController"

describe('Images', () => {
    vi.mock("../../../src/controllers/node-types/ImageController.ts", {spy: true})

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

    test('Create ›belongs-to-node‹ relationship', async () => {
        await request(app)
            .post('/images/123/belongs-to-node/456')

        expect(ImageController.createBelongsToNodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get specific ›belongs-to-node‹ relationship', async () => {
        await request(app)
            .get('/images/123/belongs-to-node/456')

        expect(ImageController.getSpecificBelongsToNodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›belongs-to-node‹ relationships', async () => {
        await request(app)
            .get('/images/123/belongs-to-node')

        expect(ImageController.getAllBelongsToNodeRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-node‹ relationship', async () => {
        await request(app)
            .delete('/images/123/belongs-to-node/456')

        expect(ImageController.deleteBelongsToNodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›belongs-to-node-type‹ relationships', async () => {
        await request(app)
            .get('/images/123/belongs-to-node-type')

        expect(ImageController.getAllBelongsToNodeTypeRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›is-prime-image-of-node‹ relationship', async () => {
        await request(app)
            .post('/images/123/is-prime-image-of-node/456')

        expect(ImageController.createIsPrimeImageOfNodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›is-prime-image-of-node‹ relationships', async () => {
        await request(app)
            .get('/images/123/is-prime-image-of-node')

        expect(ImageController.getAllIsPrimeImageOfNodeRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›is-prime-image-of-node‹ relationship', async () => {
        await request(app)
            .delete('/images/123/is-prime-image-of-node/456')

        expect(ImageController.deleteIsPrimeImageOfNodeRelation)
            .toHaveBeenCalledTimes(1)
    })
})
