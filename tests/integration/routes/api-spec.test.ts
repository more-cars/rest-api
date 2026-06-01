import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {ApiSpecController} from "../../../src/controllers/ApiSpecController"

vi.mock("../../../src/controllers/ApiSpecController.ts", {spy: true})

describe('Get API Spec', () => {
    test('Get OpenAPI specification', async () => {
        await request(app)
            .get('/specification')

        expect(ApiSpecController.apiSpec)
            .toHaveBeenCalledTimes(1)
    })
})
