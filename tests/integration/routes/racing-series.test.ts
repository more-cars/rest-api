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

    test('Get all ›has-racing-event‹ Relationships', async () => {
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

    test('Get all ›has-image‹ Relationships', async () => {
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
})
