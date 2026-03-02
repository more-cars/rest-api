import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {MagazineIssueController} from "../../../src/controllers/node-types/MagazineIssueController"

describe('Magazine Issues', () => {
    vi.mock("../../../src/controllers/node-types/MagazineIssueController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/magazine-issues')

        expect(MagazineIssueController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/magazine-issues/123')

        expect(MagazineIssueController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/magazine-issues')

        expect(MagazineIssueController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/magazine-issues/123')

        expect(MagazineIssueController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›belongs-to-magazine‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/belongs-to-magazine/456')

        expect(MagazineIssueController.createBelongsToMagazineRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›belongs-to-magazine‹ relationship', async () => {
        await request(app)
            .get('/magazine-issues/123/belongs-to-magazine')

        expect(MagazineIssueController.getBelongsToMagazineRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-magazine‹ relationship', async () => {
        await request(app)
            .delete('/magazine-issues/123/belongs-to-magazine/456')

        expect(MagazineIssueController.deleteBelongsToMagazineRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/has-image/456')

        expect(MagazineIssueController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/magazine-issues/123/has-image')

        expect(MagazineIssueController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })
})
