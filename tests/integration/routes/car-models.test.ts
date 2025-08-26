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

    test('Create "belongs to Brand" Relationship', async () => {
        await request(app)
            .post('/car-models/123/belongs-to-brand/456')

        expect(CarModelController.createBelongsToBrandRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "belongs to Brand" Relationship', async () => {
        await request(app)
            .get('/car-models/123/belongs-to-brand')

        expect(CarModelController.getBelongsToBrandRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create "has Image" Relationship', async () => {
        await request(app)
            .post('/car-models/123/has-image/456')

        expect(CarModelController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "has Image" Relationship', async () => {
        await request(app)
            .get('/car-models/123/has-image/456')

        expect(CarModelController.getHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "has Image" Relationships', async () => {
        await request(app)
            .get('/car-models/123/has-image')

        expect(CarModelController.getHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Create "has prime image" Relationship', async () => {
        await request(app)
            .post('/car-models/123/has-prime-image/456')

        expect(CarModelController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
