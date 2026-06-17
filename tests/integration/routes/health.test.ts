import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {HealthController} from "../../../src/controllers/HealthController"

vi.mock("../../../src/controllers/HealthController.ts", {spy: true})

describe('Health Check', () => {
    test('Get health', async () => {
        await request(app)
            .get('/healthz')

        expect(HealthController.healthz)
            .toHaveBeenCalledTimes(1)
    })

    test('Get health', async () => {
        await request(app)
            .get('/ready')

        expect(HealthController.ready)
            .toHaveBeenCalledTimes(1)
    })
})
