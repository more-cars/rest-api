import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RacingSeriesController} from "../../../src/controllers/RacingSeriesController"

describe('Racing Series', () => {
    vi.mock("../../../src/controllers/RacingSeriesController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/racing-series')

        expect(RacingSeriesController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/racing-series/123')

        expect(RacingSeriesController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/racing-series')

        expect(RacingSeriesController.getAll)
            .toHaveBeenCalledTimes(1)
    })
})
