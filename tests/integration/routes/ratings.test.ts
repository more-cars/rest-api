import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RatingController} from "../../../src/controllers/node-types/RatingController"

describe('Ratings', () => {
    vi.mock("../../../src/controllers/node-types/RatingController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/ratings')

        expect(RatingController.create)
            .toHaveBeenCalledTimes(1)
    })
})
