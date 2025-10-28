import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {LapTimeController} from "../../../src/controllers/LapTimeController"

describe('Lap Times', () => {
    vi.mock("../../../src/controllers/LapTimeController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/lap-times')

        expect(LapTimeController.create)
            .toHaveBeenCalledTimes(1)
    })
})
