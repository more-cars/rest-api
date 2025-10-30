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
})
