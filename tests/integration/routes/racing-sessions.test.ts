import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RacingSessionController} from "../../../src/controllers/RacingSessionController"

describe('Racing Sessions', () => {
    vi.mock("../../../src/controllers/RacingSessionController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/racing-sessions')

        expect(RacingSessionController.create)
            .toHaveBeenCalledTimes(1)
    })
})
