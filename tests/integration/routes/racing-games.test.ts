import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RacingGameController} from "../../../src/controllers/RacingGameController"

describe('Racing Games', () => {
    vi.mock("../../../src/controllers/RacingGameController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/racing-games')

        expect(RacingGameController.create)
            .toHaveBeenCalledTimes(1)
    })
})
