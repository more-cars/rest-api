import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {MotorShowController} from "../../../src/controllers/node-types/MotorShowController"

describe('Motor Shows', () => {
    vi.mock("../../../src/controllers/node-types/MotorShowController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/motor-shows')

        expect(MotorShowController.create)
            .toHaveBeenCalledTimes(1)
    })
})
