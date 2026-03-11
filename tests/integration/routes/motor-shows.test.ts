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

    test('Get Node by ID', async () => {
        await request(app)
            .get('/motor-shows/123')

        expect(MotorShowController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/motor-shows')

        expect(MotorShowController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/motor-shows/123')

        expect(MotorShowController.delete)
            .toHaveBeenCalledTimes(1)
    })
})
