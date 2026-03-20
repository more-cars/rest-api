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
})
