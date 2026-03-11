import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {ProgrammeEpisodeController} from "../../../src/controllers/node-types/ProgrammeEpisodeController"

describe('Programme Episodes', () => {
    vi.mock("../../../src/controllers/node-types/ProgrammeEpisodeController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/programme-episodes')

        expect(ProgrammeEpisodeController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/programme-episodes/123')

        expect(ProgrammeEpisodeController.getById)
            .toHaveBeenCalledTimes(1)
    })
})
