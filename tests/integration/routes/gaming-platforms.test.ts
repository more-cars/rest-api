import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {GamingPlatformController} from "../../../src/controllers/GamingPlatformController"

describe('Gaming Platforms', () => {
    vi.mock("../../../src/controllers/GamingPlatformController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/gaming-platforms')

        expect(GamingPlatformController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/gaming-platforms/123')

        expect(GamingPlatformController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/gaming-platforms')

        expect(GamingPlatformController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/gaming-platforms/123')

        expect(GamingPlatformController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›features-racing-game‹ relationship', async () => {
        await request(app)
            .post('/gaming-platforms/123/features-racing-game/456')

        expect(GamingPlatformController.createFeaturesRacingGameRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›features-racing-game‹ relationships', async () => {
        await request(app)
            .get('/gaming-platforms/123/features-racing-game')

        expect(GamingPlatformController.getAllFeaturesRacingGameRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›features-racing-game‹ relationship', async () => {
        await request(app)
            .delete('/gaming-platforms/123/features-racing-game/456')

        expect(GamingPlatformController.deleteFeaturesRacingGameRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/gaming-platforms/123/has-image/456')

        expect(GamingPlatformController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/gaming-platforms/123/has-image')

        expect(GamingPlatformController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/gaming-platforms/123/has-image/456')

        expect(GamingPlatformController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/gaming-platforms/123/has-prime-image/456')

        expect(GamingPlatformController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/gaming-platforms/123/has-prime-image')

        expect(GamingPlatformController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
