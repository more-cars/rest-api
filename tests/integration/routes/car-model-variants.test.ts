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
})
