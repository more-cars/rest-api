import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {SessionResultController} from "../../../src/controllers/node-types/SessionResultController"

describe('Session Results', () => {
    vi.mock("../../../src/controllers/node-types/SessionResultController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/session-results')

        expect(SessionResultController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/session-results/123')

        expect(SessionResultController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/session-results')

        expect(SessionResultController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/session-results/123')

        expect(SessionResultController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›belongs-to-racing-session‹ relationship', async () => {
        await request(app)
            .post('/session-results/123/belongs-to-racing-session/456')

        expect(SessionResultController.createBelongsToRacingSessionRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›belongs-to-racing-session‹ relationship', async () => {
        await request(app)
            .get('/session-results/123/belongs-to-racing-session')

        expect(SessionResultController.getBelongsToRacingSessionRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-racing-session‹ relationship', async () => {
        await request(app)
            .delete('/session-results/123/belongs-to-racing-session/456')

        expect(SessionResultController.deleteBelongsToRacingSessionRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-lap-time‹ relationship', async () => {
        await request(app)
            .post('/session-results/123/has-lap-time/456')

        expect(SessionResultController.createHasLapTimeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-lap-time‹ relationships', async () => {
        await request(app)
            .get('/session-results/123/has-lap-time')

        expect(SessionResultController.getAllHasLapTimeRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-lap-time‹ relationship', async () => {
        await request(app)
            .delete('/session-results/123/has-lap-time/456')

        expect(SessionResultController.deleteHasLapTimeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›achieved-with-car-model-variant‹ relationship', async () => {
        await request(app)
            .post('/session-results/123/achieved-with-car-model-variant/456')

        expect(SessionResultController.createAchievedWithCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›achieved-with-car-model-variant‹ relationship', async () => {
        await request(app)
            .get('/session-results/123/achieved-with-car-model-variant')

        expect(SessionResultController.getAchievedWithCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›achieved-with-car-model-variant‹ relationship', async () => {
        await request(app)
            .delete('/session-results/123/achieved-with-car-model-variant/456')

        expect(SessionResultController.deleteAchievedWithCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/session-results/123/has-image/456')

        expect(SessionResultController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/session-results/123/has-image')

        expect(SessionResultController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/session-results/123/has-image/456')

        expect(SessionResultController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/session-results/123/has-prime-image/456')

        expect(SessionResultController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/session-results/123/has-prime-image')

        expect(SessionResultController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/session-results/123/has-prime-image/456')

        expect(SessionResultController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })
})
