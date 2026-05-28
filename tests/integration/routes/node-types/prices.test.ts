import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../../src/app"
import {PriceController} from "../../../../src/controllers/node-types/PriceController"

vi.mock("../../../../src/controllers/node-types/PriceController.ts", {spy: true})

describe('Prices', () => {
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

    test('Update Node', async () => {
        await request(app)
            .patch('/prices/123')

        expect(PriceController.update)
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
            .post('/prices/123/relationships/for-car-model-variant')
            .send({
                data: {
                    type: "for-car-model-variant",
                    id: 456,
                }
            })

        expect(PriceController.createForCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›for-car-model-variant‹ relationship', async () => {
        await request(app)
            .get('/prices/123/for-car-model-variant')

        expect(PriceController.getForCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›for-car-model-variant‹ relationship', async () => {
        await request(app)
            .delete('/prices/123/relationships/for-car-model-variant')
            .send({
                data: {
                    type: "for-car-model-variant",
                    id: 456,
                },
            })

        expect(PriceController.deleteForCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/prices/123/relationships/has-image')
            .send({
                data: {
                    type: "has-image",
                    id: 456,
                }
            })

        expect(PriceController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/prices/123/has-image')

        expect(PriceController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/prices/123/relationships/has-image')
            .send({
                data: {
                    type: "has-image",
                    id: 456,
                },
            })

        expect(PriceController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/prices/123/relationships/has-prime-image')
            .send({
                data: {
                    type: "has-prime-image",
                    id: 456,
                }
            })

        expect(PriceController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/prices/123/has-prime-image')

        expect(PriceController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/prices/123/relationships/has-prime-image')
            .send({
                data: {
                    type: "has-prime-image",
                    id: 456,
                },
            })

        expect(PriceController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
