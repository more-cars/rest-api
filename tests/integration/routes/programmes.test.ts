import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {ProgrammeController} from "../../../src/controllers/node-types/ProgrammeController"

describe('Programmes', () => {
    vi.mock("../../../src/controllers/node-types/ProgrammeController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/programmes')

        expect(ProgrammeController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/programmes/123')

        expect(ProgrammeController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/programmes')

        expect(ProgrammeController.getAll)
            .toHaveBeenCalledTimes(1)
    })
})
