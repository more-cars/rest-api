import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {MotorShowController} from "../../../src/controllers/node-types/MotorShowController"

describe('Motor Shows', () => {
    vi.mock("../../../src/controllers/node-types/MotorShowController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/motor-shows')

        expect(MotorShowController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/motor-shows/123')

        expect(MotorShowController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/motor-shows')

        expect(MotorShowController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/motor-shows/123')

        expect(MotorShowController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›presents-car-model-variant‹ relationship', async () => {
        await request(app)
            .post('/motor-shows/123/presents-car-model-variant/456')

        expect(MotorShowController.createPresentsCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›presents-car-model-variant‹ relationships', async () => {
        await request(app)
            .get('/motor-shows/123/presents-car-model-variant')

        expect(MotorShowController.getAllPresentsCarModelVariantRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›presents-car-model-variant‹ relationship', async () => {
        await request(app)
            .delete('/motor-shows/123/presents-car-model-variant/456')

        expect(MotorShowController.deletePresentsCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/motor-shows/123/has-image/456')

        expect(MotorShowController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/motor-shows/123/has-image')

        expect(MotorShowController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/motor-shows/123/has-image/456')

        expect(MotorShowController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/motor-shows/123/has-prime-image/456')

        expect(MotorShowController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/motor-shows/123/has-prime-image')

        expect(MotorShowController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/motor-shows/123/has-prime-image/456')

        expect(MotorShowController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
