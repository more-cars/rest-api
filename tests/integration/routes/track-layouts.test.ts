import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {TrackLayoutController} from "../../../src/controllers/TrackLayoutController"

describe('Track Layouts', () => {
    vi.mock("../../../src/controllers/TrackLayoutController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/track-layouts')

        expect(TrackLayoutController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/track-layouts/123')

        expect(TrackLayoutController.getById)
            .toHaveBeenCalledTimes(1)
    })
})
