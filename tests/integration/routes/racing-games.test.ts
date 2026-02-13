import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RacingGameController} from "../../../src/controllers/RacingGameController"

describe('Racing Games', () => {
    vi.mock("../../../src/controllers/RacingGameController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/racing-games')

        expect(RacingGameController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/racing-games/123')

        expect(RacingGameController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/racing-games')

        expect(RacingGameController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/racing-games/123')

        expect(RacingGameController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›features-car-model-variant‹ relationship', async () => {
        await request(app)
            .post('/racing-games/123/features-car-model-variant/456')

        expect(RacingGameController.createFeaturesCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›features-car-model-variant‹ relationships', async () => {
        await request(app)
            .get('/racing-games/123/features-car-model-variant')

        expect(RacingGameController.getAllFeaturesCarModelVariantRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›features-car-model-variant‹ relationship', async () => {
        await request(app)
            .delete('/racing-games/123/features-car-model-variant/456')

        expect(RacingGameController.deleteFeaturesCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›features-track-layout‹ relationship', async () => {
        await request(app)
            .post('/racing-games/123/features-track-layout/456')

        expect(RacingGameController.createFeaturesTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›features-track-layout‹ relationships', async () => {
        await request(app)
            .get('/racing-games/123/features-track-layout')

        expect(RacingGameController.getAllFeaturesTrackLayoutRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›features-track-layout‹ relationship', async () => {
        await request(app)
            .delete('/racing-games/123/features-track-layout/456')

        expect(RacingGameController.deleteFeaturesTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›released-on-gaming-platform‹ relationship', async () => {
        await request(app)
            .post('/racing-games/123/released-on-gaming-platform/456')

        expect(RacingGameController.createReleasedOnGamingPlatformRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›released-on-gaming-platform‹ relationships', async () => {
        await request(app)
            .get('/racing-games/123/released-on-gaming-platform')

        expect(RacingGameController.getAllReleasedOnGamingPlatformRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/racing-games/123/has-image/456')

        expect(RacingGameController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/racing-games/123/has-image')

        expect(RacingGameController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/racing-games/123/has-image/456')

        expect(RacingGameController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/racing-games/123/has-prime-image/456')

        expect(RacingGameController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/racing-games/123/has-prime-image')

        expect(RacingGameController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/racing-games/123/has-prime-image/456')

        expect(RacingGameController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
