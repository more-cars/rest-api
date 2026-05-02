import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../../src/app"
import {LapTimeController} from "../../../../src/controllers/node-types/LapTimeController"

vi.mock("../../../../src/controllers/node-types/LapTimeController.ts", {spy: true})

describe('Lap Times', () => {
    test('Create Node', async () => {
        await request(app)
            .post('/lap-times')

        expect(LapTimeController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/lap-times/123')

        expect(LapTimeController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/lap-times')

        expect(LapTimeController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/lap-times/123')

        expect(LapTimeController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›belongs-to-session-result‹ relationship', async () => {
        await request(app)
            .post('/lap-times/123/belongs-to-session-result/456')

        expect(LapTimeController.createBelongsToSessionResultRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›belongs-to-session-result‹ relationship', async () => {
        await request(app)
            .get('/lap-times/123/belongs-to-session-result')

        expect(LapTimeController.getBelongsToSessionResultRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-session-result‹ relationship', async () => {
        await request(app)
            .delete('/lap-times/123/belongs-to-session-result/456')

        expect(LapTimeController.deleteBelongsToSessionResultRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›achieved-on-track-layout‹ relationship', async () => {
        await request(app)
            .post('/lap-times/123/achieved-on-track-layout/456')

        expect(LapTimeController.createAchievedOnTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›achieved-on-track-layout‹ relationship', async () => {
        await request(app)
            .get('/lap-times/123/achieved-on-track-layout')

        expect(LapTimeController.getAchievedOnTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›achieved-on-track-layout‹ relationship', async () => {
        await request(app)
            .delete('/lap-times/123/achieved-on-track-layout/456')

        expect(LapTimeController.deleteAchievedOnTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›achieved-with-car-model-variant‹ relationship', async () => {
        await request(app)
            .post('/lap-times/123/achieved-with-car-model-variant/456')

        expect(LapTimeController.createAchievedWithCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›achieved-with-car-model-variant‹ relationship', async () => {
        await request(app)
            .get('/lap-times/123/achieved-with-car-model-variant')

        expect(LapTimeController.getAchievedWithCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›achieved-with-car-model-variant‹ relationship', async () => {
        await request(app)
            .delete('/lap-times/123/achieved-with-car-model-variant/456')

        expect(LapTimeController.deleteAchievedWithCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›documented-in-magazine-issue‹ relationship', async () => {
        await request(app)
            .post('/lap-times/123/documented-in-magazine-issue/456')

        expect(LapTimeController.createDocumentedInMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›documented-in-magazine-issue‹ relationship', async () => {
        await request(app)
            .get('/lap-times/123/documented-in-magazine-issue')

        expect(LapTimeController.getDocumentedInMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›documented-in-magazine-issue‹ relationship', async () => {
        await request(app)
            .delete('/lap-times/123/documented-in-magazine-issue/456')

        expect(LapTimeController.deleteDocumentedInMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/lap-times/123/has-image/456')

        expect(LapTimeController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/lap-times/123/has-image')

        expect(LapTimeController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/lap-times/123/has-image/456')

        expect(LapTimeController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/lap-times/123/has-prime-image/456')

        expect(LapTimeController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/lap-times/123/has-prime-image')

        expect(LapTimeController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/lap-times/123/has-prime-image/456')

        expect(LapTimeController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-video‹ relationship', async () => {
        await request(app)
            .post('/lap-times/123/has-video/456')

        expect(LapTimeController.createHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-video‹ relationships', async () => {
        await request(app)
            .get('/lap-times/123/has-video')

        expect(LapTimeController.getAllHasVideoRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-video‹ relationship', async () => {
        await request(app)
            .delete('/lap-times/123/has-video/456')

        expect(LapTimeController.deleteHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-main-video‹ relationship', async () => {
        await request(app)
            .post('/lap-times/123/has-main-video/456')

        expect(LapTimeController.createHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-main-video‹ relationship', async () => {
        await request(app)
            .get('/lap-times/123/has-main-video')

        expect(LapTimeController.getHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-main-video‹ relationship', async () => {
        await request(app)
            .delete('/lap-times/123/has-main-video/456')

        expect(LapTimeController.deleteHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })
})
