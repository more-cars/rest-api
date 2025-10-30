import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {CarModelVariantController} from "../../../src/controllers/CarModelVariantController"

describe('Car Model Variants', () => {
    vi.mock("../../../src/controllers/CarModelVariantController.ts", {spy: true})

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

    test('Get all ›achieved-session-result‹ Relationships', async () => {
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

    test('Get all ›achieved-lap-time‹ Relationships', async () => {
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

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/car-model-variants/123/has-image/456')

        expect(CarModelVariantController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ Relationships', async () => {
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
