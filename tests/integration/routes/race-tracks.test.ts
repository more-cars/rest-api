import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RaceTrackController} from "../../../src/controllers/RaceTrackController"

describe('Race Tracks', () => {
    vi.mock("../../../src/controllers/RaceTrackController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/race-tracks')

        expect(RaceTrackController.create)
            .toHaveBeenCalledTimes(1)
    })
})
