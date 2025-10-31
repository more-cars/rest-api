import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {CarModelController} from "../../../src/controllers/CarModelController"

describe('Car Models', () => {
    vi.mock("../../../src/controllers/CarModelController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/car-models')

        expect(CarModelController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/car-models/123')

        expect(CarModelController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/car-models')

        expect(CarModelController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/car-models/123')

        expect(CarModelController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›belongs-to-brand‹ relationship', async () => {
        await request(app)
            .post('/car-models/123/belongs-to-brand/456')

        expect(CarModelController.createBelongsToBrandRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›belongs-to-brand‹ relationship', async () => {
        await request(app)
            .get('/car-models/123/belongs-to-brand')

        expect(CarModelController.getBelongsToBrandRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-brand‹ relationship', async () => {
        await request(app)
            .delete('/car-models/123/belongs-to-brand/456')

        expect(CarModelController.deleteBelongsToBrandRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-successor‹ relationship', async () => {
        await request(app)
            .post('/car-models/123/has-successor/456')

        expect(CarModelController.createHasSuccessorRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-successor‹ relationship', async () => {
        await request(app)
            .get('/car-models/123/has-successor')

        expect(CarModelController.getHasSuccessorRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-successor‹ relationship', async () => {
        await request(app)
            .delete('/car-models/123/has-successor/456')

        expect(CarModelController.deleteHasSuccessorRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›is-successor-of‹ relationship', async () => {
        await request(app)
            .post('/car-models/123/is-successor-of/456')

        expect(CarModelController.createIsSuccessorOfRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›is-successor-of‹ relationship', async () => {
        await request(app)
            .get('/car-models/123/is-successor-of')

        expect(CarModelController.getIsSuccessorOfRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›is-successor-of‹ relationship', async () => {
        await request(app)
            .delete('/car-models/123/is-successor-of/456')

        expect(CarModelController.deleteIsSuccessorOfRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-variant‹ relationship', async () => {
        await request(app)
            .post('/car-models/123/has-variant/456')

        expect(CarModelController.createHasVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-variant‹ relationships', async () => {
        await request(app)
            .get('/car-models/123/has-variant')

        expect(CarModelController.getAllHasVariantRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-variant‹ relationship', async () => {
        await request(app)
            .delete('/car-models/123/has-variant/456')

        expect(CarModelController.deleteHasVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/car-models/123/has-image/456')

        expect(CarModelController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get specific ›has-image‹ relationship', async () => {
        await request(app)
            .get('/car-models/123/has-image/456')

        expect(CarModelController.getSpecificHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/car-models/123/has-image')

        expect(CarModelController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/car-models/123/has-image/456')

        expect(CarModelController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create "has prime image" Relationship', async () => {
        await request(app)
            .post('/car-models/123/has-prime-image/456')

        expect(CarModelController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "has prime image" Relationship', async () => {
        await request(app)
            .get('/car-models/123/has-prime-image')

        expect(CarModelController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Has "has prime image" Relationship', async () => {
        await request(app)
            .get('/car-models/123/has-prime-image/456')

        expect(CarModelController.getSpecificHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/car-models/123/has-prime-image/456')

        expect(CarModelController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
