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

    test('Get all ›has-layout‹ Relationships', async () => {
        await request(app)
            .get('/race-tracks/123/has-layout')

        expect(RaceTrackController.getAllHasLayoutRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-layout‹ relationship', async () => {
        await request(app)
            .delete('/race-tracks/123/has-layout/456')

        expect(RaceTrackController.deleteHasLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›hosted-racing-event‹ relationship', async () => {
        await request(app)
            .post('/race-tracks/123/hosted-racing-event/456')

        expect(RaceTrackController.createHostedRacingEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›hosted-racing-event‹ Relationships', async () => {
        await request(app)
            .get('/race-tracks/123/hosted-racing-event')

        expect(RaceTrackController.getAllHostedRacingEventRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/race-tracks/123/has-image/456')

        expect(RaceTrackController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ Relationships', async () => {
        await request(app)
            .get('/race-tracks/123/has-image')

        expect(RaceTrackController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/race-tracks/123/has-image/456')

        expect(RaceTrackController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/race-tracks/123/has-prime-image/456')

        expect(RaceTrackController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/race-tracks/123/has-prime-image')

        expect(RaceTrackController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/race-tracks/123/has-prime-image/456')

        expect(RaceTrackController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
