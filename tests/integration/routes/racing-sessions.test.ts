import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RacingSessionController} from "../../../src/controllers/RacingSessionController"

describe('Racing Sessions', () => {
    vi.mock("../../../src/controllers/RacingSessionController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/racing-sessions')

        expect(RacingSessionController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/racing-sessions/123')

        expect(RacingSessionController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/racing-sessions')

        expect(RacingSessionController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/racing-sessions/123')

        expect(RacingSessionController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›belongs-to-racing-event‹ relationship', async () => {
        await request(app)
            .post('/racing-sessions/123/belongs-to-racing-event/456')

        expect(RacingSessionController.createBelongsToRacingEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›belongs-to-racing-event‹ relationship', async () => {
        await request(app)
            .get('/racing-sessions/123/belongs-to-racing-event')

        expect(RacingSessionController.getBelongsToRacingEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-racing-event‹ relationship', async () => {
        await request(app)
            .delete('/racing-sessions/123/belongs-to-racing-event/456')

        expect(RacingSessionController.deleteBelongsToRacingEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/racing-sessions/123/has-image/456')

        expect(RacingSessionController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ Relationships', async () => {
        await request(app)
            .get('/racing-sessions/123/has-image')

        expect(RacingSessionController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/racing-sessions/123/has-image/456')

        expect(RacingSessionController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/racing-sessions/123/has-prime-image/456')

        expect(RacingSessionController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
