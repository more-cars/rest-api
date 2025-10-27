import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RacingEventController} from "../../../src/controllers/RacingEventController"

describe('Racing Events', () => {
    vi.mock("../../../src/controllers/RacingEventController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/racing-events')

        expect(RacingEventController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/racing-events/123')

        expect(RacingEventController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/racing-events')

        expect(RacingEventController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/racing-events/123')

        expect(RacingEventController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›belongs-to-racing-series‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/belongs-to-racing-series/456')

        expect(RacingEventController.createBelongsToRacingSeriesRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›belongs-to-racing-series‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/belongs-to-racing-series')

        expect(RacingEventController.getBelongsToRacingSeriesRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-racing-series‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/belongs-to-racing-series/456')

        expect(RacingEventController.deleteBelongsToRacingSeriesRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›is-followed-by-event‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/is-followed-by-event/456')

        expect(RacingEventController.createIsFollowedByEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›is-followed-by-event‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/is-followed-by-event')

        expect(RacingEventController.getIsFollowedByEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›is-followed-by-event‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/is-followed-by-event/456')

        expect(RacingEventController.deleteIsFollowedByEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›follows-event‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/follows-event/456')

        expect(RacingEventController.createFollowsEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›follows-event‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/follows-event')

        expect(RacingEventController.getFollowsEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›follows-event‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/follows-event/456')

        expect(RacingEventController.deleteFollowsEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›took-place-at-race-track‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/took-place-at-race-track/456')

        expect(RacingEventController.createTookPlaceAtRaceTrackRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›took-place-at-race-track‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/took-place-at-race-track')

        expect(RacingEventController.getTookPlaceAtRaceTrackRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›took-place-at-race-track‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/took-place-at-race-track/456')

        expect(RacingEventController.deleteTookPlaceAtRaceTrackRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›used-the-track-layout‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/used-the-track-layout/456')

        expect(RacingEventController.createUsedTheTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›used-the-track-layout‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/used-the-track-layout')

        expect(RacingEventController.getUsedTheTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›used-the-track-layout‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/used-the-track-layout/456')

        expect(RacingEventController.deleteUsedTheTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-racing-session‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/has-racing-session/456')

        expect(RacingEventController.createHasRacingSessionRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-racing-session‹ Relationships', async () => {
        await request(app)
            .get('/racing-events/123/has-racing-session')

        expect(RacingEventController.getAllHasRacingSessionRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/has-image/456')

        expect(RacingEventController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ Relationships', async () => {
        await request(app)
            .get('/racing-events/123/has-image')

        expect(RacingEventController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/has-image/456')

        expect(RacingEventController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/has-prime-image/456')

        expect(RacingEventController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/has-prime-image')

        expect(RacingEventController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/has-prime-image/456')

        expect(RacingEventController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
