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

    test('Get all Nodes', async () => {
        await request(app)
            .get('/track-layouts')

        expect(TrackLayoutController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/track-layouts/123')

        expect(TrackLayoutController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›belongs-to-race-track‹ relationship', async () => {
        await request(app)
            .post('/track-layouts/123/belongs-to-race-track/456')

        expect(TrackLayoutController.createBelongsToRaceTrackRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›belongs-to-race-track‹ relationship', async () => {
        await request(app)
            .get('/track-layouts/123/belongs-to-race-track')

        expect(TrackLayoutController.getBelongsToRaceTrackRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-race-track‹ relationship', async () => {
        await request(app)
            .delete('/track-layouts/123/belongs-to-race-track/456')

        expect(TrackLayoutController.deleteBelongsToRaceTrackRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/track-layouts/123/has-image/456')

        expect(TrackLayoutController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ Relationships', async () => {
        await request(app)
            .get('/track-layouts/123/has-image')

        expect(TrackLayoutController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/track-layouts/123/has-image/456')

        expect(TrackLayoutController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/track-layouts/123/has-prime-image/456')

        expect(TrackLayoutController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/track-layouts/123/has-prime-image')

        expect(TrackLayoutController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
