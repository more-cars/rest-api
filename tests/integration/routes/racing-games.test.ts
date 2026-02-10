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
})
