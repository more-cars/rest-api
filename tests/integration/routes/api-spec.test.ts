import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {ApiSpecController} from "../../../src/controllers/ApiSpecController"

describe('Get API Spec', () => {
    vi.mock("../../../src/controllers/node-types/ApiSpecController.ts", {spy: true})

    test('Get OpenAPI specification', async () => {
        await request(app)
            .get('/')

        expect(ApiSpecController.apiSpec)
            .toHaveBeenCalledTimes(1)
    })
})
