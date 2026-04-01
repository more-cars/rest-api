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

    test('Create ›has-issue‹ relationship', async () => {
        await request(app)
            .post('/magazines/123/has-issue/456')

        expect(MagazineController.createHasIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-issue‹ relationships', async () => {
        await request(app)
            .get('/magazines/123/has-issue')

        expect(MagazineController.getAllHasIssueRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-issue‹ relationship', async () => {
        await request(app)
            .delete('/magazines/123/has-issue/456')

        expect(MagazineController.deleteHasIssueRelation)
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

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/magazines/123/has-prime-image/456')

        expect(MagazineController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/magazines/123/has-prime-image')

        expect(MagazineController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/magazines/123/has-prime-image/456')

        expect(MagazineController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-video‹ relationship', async () => {
        await request(app)
            .post('/magazines/123/has-video/456')

        expect(MagazineController.createHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-video‹ relationships', async () => {
        await request(app)
            .get('/magazines/123/has-video')

        expect(MagazineController.getAllHasVideoRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-video‹ relationship', async () => {
        await request(app)
            .delete('/magazines/123/has-video/456')

        expect(MagazineController.deleteHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-main-video‹ relationship', async () => {
        await request(app)
            .post('/magazines/123/has-main-video/456')

        expect(MagazineController.createHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-main-video‹ relationship', async () => {
        await request(app)
            .get('/magazines/123/has-main-video')

        expect(MagazineController.getHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-main-video‹ relationship', async () => {
        await request(app)
            .delete('/magazines/123/has-main-video/456')

        expect(MagazineController.deleteHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })
})
