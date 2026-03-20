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
})
