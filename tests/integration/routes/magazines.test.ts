import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {MagazineController} from "../../../src/controllers/node-types/MagazineController"

describe('Magazines', () => {
    vi.mock("../../../src/controllers/node-types/MagazineController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/magazines')

        expect(MagazineController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/magazines/123')

        expect(MagazineController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/magazines')

        expect(MagazineController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/magazines/123')

        expect(MagazineController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/magazines/123/has-image/456')

        expect(MagazineController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/magazines/123/has-image')

        expect(MagazineController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/magazines/123/has-image/456')

        expect(MagazineController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
