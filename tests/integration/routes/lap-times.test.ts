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

    test('Get Node by ID', async () => {
        await request(app)
            .get('/lap-times/123')

        expect(LapTimeController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/lap-times')

        expect(LapTimeController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/lap-times/123')

        expect(LapTimeController.delete)
            .toHaveBeenCalledTimes(1)
    })
})
