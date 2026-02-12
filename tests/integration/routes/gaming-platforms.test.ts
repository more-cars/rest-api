import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {GamingPlatformController} from "../../../src/controllers/GamingPlatformController"

describe('Gaming Platforms', () => {
    vi.mock("../../../src/controllers/GamingPlatformController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/gaming-platforms')

        expect(GamingPlatformController.create)
            .toHaveBeenCalledTimes(1)
    })
})
