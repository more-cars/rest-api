import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RacingSessionController} from "../../../src/controllers/node-types/RacingSessionController"

describe('Racing Sessions', () => {
    vi.mock("../../../src/controllers/node-types/RacingSessionController.ts", {spy: true})

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

    test('Create ›has-session-result‹ relationship', async () => {
        await request(app)
            .post('/racing-sessions/123/has-session-result/456')

        expect(RacingSessionController.createHasSessionResultRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-session-result‹ relationships', async () => {
        await request(app)
            .get('/racing-sessions/123/has-session-result')

        expect(RacingSessionController.getAllHasSessionResultRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-session-result‹ relationship', async () => {
        await request(app)
            .delete('/racing-sessions/123/has-session-result/456')

        expect(RacingSessionController.deleteHasSessionResultRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/racing-sessions/123/has-image/456')

        expect(RacingSessionController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
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

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/racing-sessions/123/has-prime-image')

        expect(RacingSessionController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/racing-sessions/123/has-prime-image/456')

        expect(RacingSessionController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-video‹ relationship', async () => {
        await request(app)
            .post('/racing-sessions/123/has-video/456')

        expect(RacingSessionController.createHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-video‹ relationships', async () => {
        await request(app)
            .get('/racing-sessions/123/has-video')

        expect(RacingSessionController.getAllHasVideoRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-video‹ relationship', async () => {
        await request(app)
            .delete('/racing-sessions/123/has-video/456')

        expect(RacingSessionController.deleteHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-main-video‹ relationship', async () => {
        await request(app)
            .post('/racing-sessions/123/has-main-video/456')

        expect(RacingSessionController.createHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-main-video‹ relationship', async () => {
        await request(app)
            .get('/racing-sessions/123/has-main-video')

        expect(RacingSessionController.getHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-main-video‹ relationship', async () => {
        await request(app)
            .delete('/racing-sessions/123/has-main-video/456')

        expect(RacingSessionController.deleteHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })
})
