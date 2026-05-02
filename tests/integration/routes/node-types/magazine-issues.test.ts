import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../../src/app"
import {MagazineIssueController} from "../../../../src/controllers/node-types/MagazineIssueController"

vi.mock("../../../../src/controllers/node-types/MagazineIssueController.ts", {spy: true})

describe('Magazine Issues', () => {
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

    test('Create ›follows-issue‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/follows-issue/456')

        expect(MagazineIssueController.createFollowsIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›follows-issue‹ relationship', async () => {
        await request(app)
            .get('/magazine-issues/123/follows-issue')

        expect(MagazineIssueController.getFollowsIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›follows-issue‹ relationship', async () => {
        await request(app)
            .delete('/magazine-issues/123/follows-issue/456')

        expect(MagazineIssueController.deleteFollowsIssueRelation)
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

    test('Create ›covers-car-model‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/covers-car-model/456')

        expect(MagazineIssueController.createCoversCarModelRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›covers-car-model‹ relationships', async () => {
        await request(app)
            .get('/magazine-issues/123/covers-car-model')

        expect(MagazineIssueController.getAllCoversCarModelRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›covers-car-model‹ relationship', async () => {
        await request(app)
            .delete('/magazine-issues/123/covers-car-model/456')

        expect(MagazineIssueController.deleteCoversCarModelRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›presents-car-model-variant‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/presents-car-model-variant/456')

        expect(MagazineIssueController.createPresentsCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›presents-car-model-variant‹ relationships', async () => {
        await request(app)
            .get('/magazine-issues/123/presents-car-model-variant')

        expect(MagazineIssueController.getAllPresentsCarModelVariantRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›presents-car-model-variant‹ relationship', async () => {
        await request(app)
            .delete('/magazine-issues/123/presents-car-model-variant/456')

        expect(MagazineIssueController.deletePresentsCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›reviewed-car-model-variant-with-rating‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/reviewed-car-model-variant-with-rating/456')

        expect(MagazineIssueController.createReviewedCarModelVariantWithRatingRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›reviewed-car-model-variant-with-rating‹ relationships', async () => {
        await request(app)
            .get('/magazine-issues/123/reviewed-car-model-variant-with-rating')

        expect(MagazineIssueController.getAllReviewedCarModelVariantWithRatingRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›reviewed-car-model-variant-with-rating‹ relationship', async () => {
        await request(app)
            .delete('/magazine-issues/123/reviewed-car-model-variant-with-rating/456')

        expect(MagazineIssueController.deleteReviewedCarModelVariantWithRatingRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›covers-racing-event‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/covers-racing-event/456')

        expect(MagazineIssueController.createCoversRacingEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›covers-racing-event‹ relationships', async () => {
        await request(app)
            .get('/magazine-issues/123/covers-racing-event')

        expect(MagazineIssueController.getAllCoversRacingEventRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›covers-racing-event‹ relationship', async () => {
        await request(app)
            .delete('/magazine-issues/123/covers-racing-event/456')

        expect(MagazineIssueController.deleteCoversRacingEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›documents-lap-time‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/documents-lap-time/456')

        expect(MagazineIssueController.createDocumentsLapTimeRelation)
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

    test('Create ›has-video‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/has-video/456')

        expect(MagazineIssueController.createHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-video‹ relationships', async () => {
        await request(app)
            .get('/magazine-issues/123/has-video')

        expect(MagazineIssueController.getAllHasVideoRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-video‹ relationship', async () => {
        await request(app)
            .delete('/magazine-issues/123/has-video/456')

        expect(MagazineIssueController.deleteHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-main-video‹ relationship', async () => {
        await request(app)
            .post('/magazine-issues/123/has-main-video/456')

        expect(MagazineIssueController.createHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-main-video‹ relationship', async () => {
        await request(app)
            .get('/magazine-issues/123/has-main-video')

        expect(MagazineIssueController.getHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-main-video‹ relationship', async () => {
        await request(app)
            .delete('/magazine-issues/123/has-main-video/456')

        expect(MagazineIssueController.deleteHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })
})
