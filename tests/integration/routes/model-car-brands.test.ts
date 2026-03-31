import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {ModelCarBrandController} from "../../../src/controllers/node-types/ModelCarBrandController"

describe('Model Car Brands', () => {
    vi.mock("../../../src/controllers/node-types/ModelCarBrandController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/model-car-brands')

        expect(ModelCarBrandController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/model-car-brands/123')

        expect(ModelCarBrandController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/model-car-brands')

        expect(ModelCarBrandController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/model-car-brands/123')

        expect(ModelCarBrandController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›created-model-car‹ relationship', async () => {
        await request(app)
            .post('/model-car-brands/123/created-model-car/456')

        expect(ModelCarBrandController.createCreatedModelCarRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›created-model-car‹ relationships', async () => {
        await request(app)
            .get('/model-car-brands/123/created-model-car')

        expect(ModelCarBrandController.getAllCreatedModelCarRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›created-model-car‹ relationship', async () => {
        await request(app)
            .delete('/model-car-brands/123/created-model-car/456')

        expect(ModelCarBrandController.deleteCreatedModelCarRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/model-car-brands/123/has-image/456')

        expect(ModelCarBrandController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/model-car-brands/123/has-image')

        expect(ModelCarBrandController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/model-car-brands/123/has-image/456')

        expect(ModelCarBrandController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/model-car-brands/123/has-prime-image/456')

        expect(ModelCarBrandController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/model-car-brands/123/has-prime-image')

        expect(ModelCarBrandController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/model-car-brands/123/has-prime-image/456')

        expect(ModelCarBrandController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-video‹ relationship', async () => {
        await request(app)
            .post('/model-car-brands/123/has-video/456')

        expect(ModelCarBrandController.createHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-video‹ relationships', async () => {
        await request(app)
            .get('/model-car-brands/123/has-video')

        expect(ModelCarBrandController.getAllHasVideoRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-video‹ relationship', async () => {
        await request(app)
            .delete('/model-car-brands/123/has-video/456')

        expect(ModelCarBrandController.deleteHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-main-video‹ relationship', async () => {
        await request(app)
            .post('/model-car-brands/123/has-main-video/456')

        expect(ModelCarBrandController.createHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-main-video‹ relationship', async () => {
        await request(app)
            .get('/model-car-brands/123/has-main-video')

        expect(ModelCarBrandController.getHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-main-video‹ relationship', async () => {
        await request(app)
            .delete('/model-car-brands/123/has-main-video/456')

        expect(ModelCarBrandController.deleteHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })
})
