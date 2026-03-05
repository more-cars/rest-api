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

    test('Create ›followed-by-issue‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/followed-by-issue/456')

        expect(MagazineIssueController.createFollowedByIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›followed-by-issue‹ relationship', async () => {
        await request(app)
            .get('/magazine-issues/123/followed-by-issue')

        expect(MagazineIssueController.getFollowedByIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›followed-by-issue‹ relationship', async () => {
        await request(app)
            .delete('/magazine-issues/123/followed-by-issue/456')

        expect(MagazineIssueController.deleteFollowedByIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›follows-issue‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/follows-issue/456')

        expect(MagazineIssueController.createFollowsIssueRelation)
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

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/magazine-issues/123/has-image/456')

        expect(MagazineIssueController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/has-prime-image/456')

        expect(MagazineIssueController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/magazine-issues/123/has-prime-image')

        expect(MagazineIssueController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/magazine-issues/123/has-prime-image/456')

        expect(MagazineIssueController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
