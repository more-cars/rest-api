import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RaceTrackController} from "../../../src/controllers/RaceTrackController"

describe('Race Tracks', () => {
    vi.mock("../../../src/controllers/RaceTrackController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/race-tracks')

        expect(RaceTrackController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/race-tracks/123')

        expect(RaceTrackController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/race-tracks')

        expect(RaceTrackController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/race-tracks/123')

        expect(RaceTrackController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-layout‹ relationship', async () => {
        await request(app)
            .post('/race-tracks/123/has-layout/456')

        expect(RaceTrackController.createHasLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })
})
