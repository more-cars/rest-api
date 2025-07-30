import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {BrandController} from "../../../src/controllers/BrandController"

describe('Brands', () => {
    vi.mock("../../../src/controllers/BrandController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/brands')

        expect(BrandController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/brands/123')

        expect(BrandController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/brands')

        expect(BrandController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Create "has Car Model" Relationship', async () => {
        await request(app)
            .post('/brands/123/has-car-model/456')

        expect(BrandController.createHasCarModelRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "has Car Model" Relationships', async () => {
        await request(app)
            .get('/brands/123/has-car-model')

        expect(BrandController.getHasCarModelRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Create "has Image" Relationship', async () => {
        await request(app)
            .post('/brands/123/has-image/456')

        expect(BrandController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "has Image" Relationships', async () => {
        await request(app)
            .get('/brands/123/has-image')

        expect(BrandController.getHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })
})
