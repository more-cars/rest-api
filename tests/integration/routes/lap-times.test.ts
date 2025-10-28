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

    test('Create ›belongs-to-session-result‹ relationship', async () => {
        await request(app)
            .post('/lap-times/123/belongs-to-session-result/456')

        expect(LapTimeController.createBelongsToSessionResultRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›belongs-to-session-result‹ relationship', async () => {
        await request(app)
            .get('/lap-times/123/belongs-to-session-result')

        expect(LapTimeController.getBelongsToSessionResultRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-session-result‹ relationship', async () => {
        await request(app)
            .delete('/lap-times/123/belongs-to-session-result/456')

        expect(LapTimeController.deleteBelongsToSessionResultRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›achieved-on-track-layout‹ relationship', async () => {
        await request(app)
            .post('/lap-times/123/achieved-on-track-layout/456')

        expect(LapTimeController.createAchievedOnTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›achieved-on-track-layout‹ relationship', async () => {
        await request(app)
            .get('/lap-times/123/achieved-on-track-layout')

        expect(LapTimeController.getAchievedOnTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›achieved-on-track-layout‹ relationship', async () => {
        await request(app)
            .delete('/lap-times/123/achieved-on-track-layout/456')

        expect(LapTimeController.deleteAchievedOnTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/lap-times/123/has-image/456')

        expect(LapTimeController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ Relationships', async () => {
        await request(app)
            .get('/lap-times/123/has-image')

        expect(LapTimeController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })
})
