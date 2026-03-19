import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {ModelCarController} from "../../../src/controllers/node-types/ModelCarController"

describe('Model Cars', () => {
    vi.mock("../../../src/controllers/node-types/ModelCarController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/model-cars')

        expect(ModelCarController.create)
            .toHaveBeenCalledTimes(1)
    })
})
