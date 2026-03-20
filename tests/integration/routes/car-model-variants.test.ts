import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {CarModelVariantController} from "../../../src/controllers/node-types/CarModelVariantController"

describe('Car Model Variants', () => {
    vi.mock("../../../src/controllers/node-types/CarModelVariantController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/car-model-variants')

        expect(CarModelVariantController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/car-model-variants/123')

        expect(CarModelVariantController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/car-model-variants')

        expect(CarModelVariantController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/car-model-variants/123')

        expect(CarModelVariantController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›is-variant-of‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/is-variant-of/456')

        expect(CarModelVariantController.createIsVariantOfRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›is-variant-of‹ relationship', async () => {
        await request(app)
            .get('/car-model-variants/123/is-variant-of')

        expect(CarModelVariantController.getIsVariantOfRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›is-variant-of‹ relationship', async () => {
        await request(app)
            .delete('/car-model-variants/123/is-variant-of/456')

        expect(CarModelVariantController.deleteIsVariantOfRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›achieved-session-result‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/achieved-session-result/456')

        expect(CarModelVariantController.createAchievedSessionResultRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›achieved-session-result‹ relationships', async () => {
        await request(app)
            .get('/car-model-variants/123/achieved-session-result')

        expect(CarModelVariantController.getAllAchievedSessionResultRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›achieved-session-result‹ relationship', async () => {
        await request(app)
            .delete('/car-model-variants/123/achieved-session-result/456')

        expect(CarModelVariantController.deleteAchievedSessionResultRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›achieved-lap-time‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/achieved-lap-time/456')

        expect(CarModelVariantController.createAchievedLapTimeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›achieved-lap-time‹ relationships', async () => {
        await request(app)
            .get('/car-model-variants/123/achieved-lap-time')

        expect(CarModelVariantController.getAllAchievedLapTimeRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›achieved-lap-time‹ relationship', async () => {
        await request(app)
            .delete('/car-model-variants/123/achieved-lap-time/456')

        expect(CarModelVariantController.deleteAchievedLapTimeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›is-presented-in-magazine-issue‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/is-presented-in-magazine-issue/456')

        expect(CarModelVariantController.createIsPresentedInMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›is-presented-in-magazine-issue‹ relationships', async () => {
        await request(app)
            .get('/car-model-variants/123/is-presented-in-magazine-issue')

        expect(CarModelVariantController.getAllIsPresentedInMagazineIssueRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›is-presented-in-magazine-issue‹ relationship', async () => {
        await request(app)
            .delete('/car-model-variants/123/is-presented-in-magazine-issue/456')

        expect(CarModelVariantController.deleteIsPresentedInMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›reviewed-by-magazine-issue-with-rating‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/reviewed-by-magazine-issue-with-rating/456')

        expect(CarModelVariantController.createReviewedByMagazineIssueWithRatingRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›reviewed-by-magazine-issue-with-rating‹ relationships', async () => {
        await request(app)
            .get('/car-model-variants/123/reviewed-by-magazine-issue-with-rating')

        expect(CarModelVariantController.getAllReviewedByMagazineIssueWithRatingRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›reviewed-by-magazine-issue-with-rating‹ relationship', async () => {
        await request(app)
            .delete('/car-model-variants/123/reviewed-by-magazine-issue-with-rating/456')

        expect(CarModelVariantController.deleteReviewedByMagazineIssueWithRatingRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›featured-in-programme-episode‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/featured-in-programme-episode/456')

        expect(CarModelVariantController.createFeaturedInProgrammeEpisodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›featured-in-programme-episode‹ relationships', async () => {
        await request(app)
            .get('/car-model-variants/123/featured-in-programme-episode')

        expect(CarModelVariantController.getAllFeaturedInProgrammeEpisodeRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›featured-in-programme-episode‹ relationship', async () => {
        await request(app)
            .delete('/car-model-variants/123/featured-in-programme-episode/456')

        expect(CarModelVariantController.deleteFeaturedInProgrammeEpisodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›is-featured-in-racing-game‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/is-featured-in-racing-game/456')

        expect(CarModelVariantController.createIsFeaturedInRacingGameRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›is-featured-in-racing-game‹ relationships', async () => {
        await request(app)
            .get('/car-model-variants/123/is-featured-in-racing-game')

        expect(CarModelVariantController.getAllIsFeaturedInRacingGameRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›is-featured-in-racing-game‹ relationship', async () => {
        await request(app)
            .delete('/car-model-variants/123/is-featured-in-racing-game/456')

        expect(CarModelVariantController.deleteIsFeaturedInRacingGameRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›presented-at-motor-show‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/presented-at-motor-show/456')

        expect(CarModelVariantController.createPresentedAtMotorShowRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›presented-at-motor-show‹ relationships', async () => {
        await request(app)
            .get('/car-model-variants/123/presented-at-motor-show')

        expect(CarModelVariantController.getAllPresentedAtMotorShowRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›presented-at-motor-show‹ relationship', async () => {
        await request(app)
            .delete('/car-model-variants/123/presented-at-motor-show/456')

        expect(CarModelVariantController.deletePresentedAtMotorShowRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-price‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/has-price/456')

        expect(CarModelVariantController.createHasPriceRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-price‹ relationships', async () => {
        await request(app)
            .get('/car-model-variants/123/has-price')

        expect(CarModelVariantController.getAllHasPriceRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/has-image/456')

        expect(CarModelVariantController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/car-model-variants/123/has-image')

        expect(CarModelVariantController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/car-model-variants/123/has-image/456')

        expect(CarModelVariantController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/has-prime-image/456')

        expect(CarModelVariantController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/car-model-variants/123/has-prime-image')

        expect(CarModelVariantController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/car-model-variants/123/has-prime-image/456')

        expect(CarModelVariantController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
