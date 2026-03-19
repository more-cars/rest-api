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
})
