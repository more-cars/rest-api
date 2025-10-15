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

    test('Delete Node', async () => {
        await request(app)
            .delete('/brands/123')

        expect(BrandController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›belongs-to-company‹ relationship', async () => {
        await request(app)
            .post('/brands/123/belongs-to-company/456')

        expect(BrandController.createBelongsToCompanyRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›belongs-to-company‹ relationship', async () => {
        await request(app)
            .get('/brands/123/belongs-to-company')

        expect(BrandController.getBelongsToCompanyRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-car-model‹ Relationship', async () => {
        await request(app)
            .post('/brands/123/has-car-model/456')

        expect(BrandController.createHasCarModelRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "has Car Model" Relationship', async () => {
        await request(app)
            .get('/brands/123/has-car-model/456')

        expect(BrandController.getSpecificHasCarModelRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "has Car Model" Relationships', async () => {
        await request(app)
            .get('/brands/123/has-car-model')

        expect(BrandController.getAllHasCarModelRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-car-model‹ relationship', async () => {
        await request(app)
            .delete('/brands/123/has-car-model/456')

        expect(BrandController.deleteHasCarModelRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create "has Image" Relationship', async () => {
        await request(app)
            .post('/brands/123/has-image/456')

        expect(BrandController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "has Image" Relationship', async () => {
        await request(app)
            .get('/brands/123/has-image/456')

        expect(BrandController.getSpecificHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get "has Image" Relationships', async () => {
        await request(app)
            .get('/brands/123/has-image')

        expect(BrandController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/brands/123/has-image/456')

        expect(BrandController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/brands/123/has-prime-image/456')

        expect(BrandController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/brands/123/has-prime-image')

        expect(BrandController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/brands/123/has-prime-image/456')

        expect(BrandController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
