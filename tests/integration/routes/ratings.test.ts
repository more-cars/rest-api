import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RatingController} from "../../../src/controllers/node-types/RatingController"

describe('Ratings', () => {
    vi.mock("../../../src/controllers/node-types/RatingController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/ratings')

        expect(RatingController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/ratings/123')

        expect(RatingController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/ratings')

        expect(RatingController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/ratings/123')

        expect(RatingController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›by-magazine-issue‹ relationship', async () => {
        await request(app)
            .post('/ratings/123/by-magazine-issue/456')

        expect(RatingController.createByMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›by-magazine-issue‹ relationship', async () => {
        await request(app)
            .get('/ratings/123/by-magazine-issue')

        expect(RatingController.getByMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›by-magazine-issue‹ relationship', async () => {
        await request(app)
            .delete('/ratings/123/by-magazine-issue/456')

        expect(RatingController.deleteByMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›for-car-model-variant‹ relationship', async () => {
        await request(app)
            .post('/ratings/123/for-car-model-variant/456')

        expect(RatingController.createForCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›for-car-model-variant‹ relationship', async () => {
        await request(app)
            .get('/ratings/123/for-car-model-variant')

        expect(RatingController.getForCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›for-car-model-variant‹ relationship', async () => {
        await request(app)
            .delete('/ratings/123/for-car-model-variant/456')

        expect(RatingController.deleteForCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/ratings/123/has-image/456')

        expect(RatingController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/ratings/123/has-image')

        expect(RatingController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/ratings/123/has-image/456')

        expect(RatingController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/ratings/123/has-prime-image/456')

        expect(RatingController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/ratings/123/has-prime-image')

        expect(RatingController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
