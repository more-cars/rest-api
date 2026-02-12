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

    test('Get Node by ID', async () => {
        await request(app)
            .get('/gaming-platforms/123')

        expect(GamingPlatformController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/gaming-platforms')

        expect(GamingPlatformController.getAll)
            .toHaveBeenCalledTimes(1)
    })
})
