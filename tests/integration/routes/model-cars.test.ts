import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {ModelCarController} from "../../../src/controllers/node-types/ModelCarController"

describe('Model Cars', () => {
    vi.mock("../../../src/controllers/node-types/ModelCarController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/model-cars')

        expect(ModelCarController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/model-cars/123')

        expect(ModelCarController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/model-cars')

        expect(ModelCarController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/model-cars/123')

        expect(ModelCarController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›is-scale-model-of-car-model-variant‹ relationship', async () => {
        await request(app)
            .post('/model-cars/123/is-scale-model-of-car-model-variant/456')

        expect(ModelCarController.createIsScaleModelOfCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›is-scale-model-of-car-model-variant‹ relationship', async () => {
        await request(app)
            .get('/model-cars/123/is-scale-model-of-car-model-variant')

        expect(ModelCarController.getIsScaleModelOfCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›is-scale-model-of-car-model-variant‹ relationship', async () => {
        await request(app)
            .delete('/model-cars/123/is-scale-model-of-car-model-variant/456')

        expect(ModelCarController.deleteIsScaleModelOfCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›made-by-model-car-brand‹ relationship', async () => {
        await request(app)
            .post('/model-cars/123/made-by-model-car-brand/456')

        expect(ModelCarController.createMadeByModelCarBrandRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›made-by-model-car-brand‹ relationship', async () => {
        await request(app)
            .get('/model-cars/123/made-by-model-car-brand')

        expect(ModelCarController.getMadeByModelCarBrandRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›made-by-model-car-brand‹ relationship', async () => {
        await request(app)
            .delete('/model-cars/123/made-by-model-car-brand/456')

        expect(ModelCarController.deleteMadeByModelCarBrandRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/model-cars/123/has-image/456')

        expect(ModelCarController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/model-cars/123/has-image')

        expect(ModelCarController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/model-cars/123/has-image/456')

        expect(ModelCarController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/model-cars/123/has-prime-image/456')

        expect(ModelCarController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/model-cars/123/has-prime-image')

        expect(ModelCarController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/model-cars/123/has-prime-image/456')

        expect(ModelCarController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
