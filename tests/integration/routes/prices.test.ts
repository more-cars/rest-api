import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {PriceController} from "../../../src/controllers/node-types/PriceController"

describe('Prices', () => {
    vi.mock("../../../src/controllers/node-types/PriceController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/prices')

        expect(PriceController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/prices/123')

        expect(PriceController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/prices')

        expect(PriceController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/prices/123')

        expect(PriceController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›for-car-model-variant‹ relationship', async () => {
        await request(app)
            .post('/prices/123/for-car-model-variant/456')

        expect(PriceController.createForCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›for-car-model-variant‹ relationship', async () => {
        await request(app)
            .get('/prices/123/for-car-model-variant')

        expect(PriceController.getForCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })
})
