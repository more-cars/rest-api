import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {HealthController} from "../../../src/controllers/HealthController"

describe('Health', () => {
    vi.mock("../../../src/controllers/node-types/HealthController.ts", {spy: true})

    test('Get health', async () => {
        await request(app)
            .get('/health')

        expect(HealthController.health)
            .toHaveBeenCalledTimes(1)
    })
})
