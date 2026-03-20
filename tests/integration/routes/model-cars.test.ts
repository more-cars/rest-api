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

    test('Get Node by ID', async () => {
        await request(app)
            .get('/model-cars/123')

        expect(ModelCarController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/model-cars')

        expect(ModelCarController.getAll)
            .toHaveBeenCalledTimes(1)
    })
})
