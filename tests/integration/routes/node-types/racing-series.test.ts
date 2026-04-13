import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../../src/app"
import {RacingSeriesController} from "../../../../src/controllers/node-types/RacingSeriesController"

vi.mock("../../../../src/controllers/node-types/RacingSeriesController.ts", {spy: true})

describe('Racing Series', () => {
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

    test('Delete Node', async () => {
        await request(app)
            .delete('/racing-series/123')

        expect(RacingSeriesController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-racing-event‹ relationship', async () => {
        await request(app)
            .post('/racing-series/123/has-racing-event/456')

        expect(RacingSeriesController.createHasRacingEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-racing-event‹ relationships', async () => {
        await request(app)
            .get('/racing-series/123/has-racing-event')

        expect(RacingSeriesController.getAllHasRacingEventRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-racing-event‹ relationship', async () => {
        await request(app)
            .delete('/racing-series/123/has-racing-event/456')

        expect(RacingSeriesController.deleteHasRacingEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/racing-series/123/has-image/456')

        expect(RacingSeriesController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/racing-series/123/has-image')

        expect(RacingSeriesController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/racing-series/123/has-image/456')

        expect(RacingSeriesController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/racing-series/123/has-prime-image/456')

        expect(RacingSeriesController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/racing-series/123/has-prime-image')

        expect(RacingSeriesController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/racing-series/123/has-prime-image/456')

        expect(RacingSeriesController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-video‹ relationship', async () => {
        await request(app)
            .post('/racing-series/123/has-video/456')

        expect(RacingSeriesController.createHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-video‹ relationships', async () => {
        await request(app)
            .get('/racing-series/123/has-video')

        expect(RacingSeriesController.getAllHasVideoRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-video‹ relationship', async () => {
        await request(app)
            .delete('/racing-series/123/has-video/456')

        expect(RacingSeriesController.deleteHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-main-video‹ relationship', async () => {
        await request(app)
            .post('/racing-series/123/has-main-video/456')

        expect(RacingSeriesController.createHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-main-video‹ relationship', async () => {
        await request(app)
            .get('/racing-series/123/has-main-video')

        expect(RacingSeriesController.getHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-main-video‹ relationship', async () => {
        await request(app)
            .delete('/racing-series/123/has-main-video/456')

        expect(RacingSeriesController.deleteHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })
})
