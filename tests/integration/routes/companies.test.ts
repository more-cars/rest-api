import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {CompanyController} from "../../../src/controllers/CompanyController"

describe('Companies', () => {
    vi.mock("../../../src/controllers/CompanyController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/companies')

        expect(CompanyController.create)
            .toHaveBeenCalledTimes(1)
    })
})
