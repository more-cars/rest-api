import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RacingEventController} from "../../../src/controllers/RacingEventController"

describe('Racing Events', () => {
    vi.mock("../../../src/controllers/RacingEventController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/racing-events')

        expect(RacingEventController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/racing-events/123')

        expect(RacingEventController.getById)
            .toHaveBeenCalledTimes(1)
    })
})
