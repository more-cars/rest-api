import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {ProgrammeEpisodeController} from "../../../src/controllers/node-types/ProgrammeEpisodeController"

describe('Programme Episodes', () => {
    vi.mock("../../../src/controllers/node-types/ProgrammeEpisodeController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/programme-episodes')

        expect(ProgrammeEpisodeController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/programme-episodes/123')

        expect(ProgrammeEpisodeController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/programme-episodes')

        expect(ProgrammeEpisodeController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/programme-episodes/123')

        expect(ProgrammeEpisodeController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›belongs-to-programme‹ relationship', async () => {
        await request(app)
            .post('/programme-episodes/123/belongs-to-programme/456')

        expect(ProgrammeEpisodeController.createBelongsToProgrammeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›belongs-to-programme‹ relationship', async () => {
        await request(app)
            .get('/programme-episodes/123/belongs-to-programme')

        expect(ProgrammeEpisodeController.getBelongsToProgrammeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-programme‹ relationship', async () => {
        await request(app)
            .delete('/programme-episodes/123/belongs-to-programme/456')

        expect(ProgrammeEpisodeController.deleteBelongsToProgrammeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›follows-episode‹ relationship', async () => {
        await request(app)
            .post('/programme-episodes/123/follows-episode/456')

        expect(ProgrammeEpisodeController.createFollowsEpisodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›follows-episode‹ relationship', async () => {
        await request(app)
            .get('/programme-episodes/123/follows-episode')

        expect(ProgrammeEpisodeController.getFollowsEpisodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›is-followed-by-episode‹ relationship', async () => {
        await request(app)
            .post('/programme-episodes/123/is-followed-by-episode/456')

        expect(ProgrammeEpisodeController.createIsFollowedByEpisodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›is-followed-by-episode‹ relationship', async () => {
        await request(app)
            .get('/programme-episodes/123/is-followed-by-episode')

        expect(ProgrammeEpisodeController.getIsFollowedByEpisodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›is-followed-by-episode‹ relationship', async () => {
        await request(app)
            .delete('/programme-episodes/123/is-followed-by-episode/456')

        expect(ProgrammeEpisodeController.deleteIsFollowedByEpisodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›covers-car-model‹ relationship', async () => {
        await request(app)
            .post('/programme-episodes/123/covers-car-model/456')

        expect(ProgrammeEpisodeController.createCoversCarModelRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›covers-car-model‹ relationships', async () => {
        await request(app)
            .get('/programme-episodes/123/covers-car-model')

        expect(ProgrammeEpisodeController.getAllCoversCarModelRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›covers-car-model‹ relationship', async () => {
        await request(app)
            .delete('/programme-episodes/123/covers-car-model/456')

        expect(ProgrammeEpisodeController.deleteCoversCarModelRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›features-car-model-variant‹ relationship', async () => {
        await request(app)
            .post('/programme-episodes/123/features-car-model-variant/456')

        expect(ProgrammeEpisodeController.createFeaturesCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›features-car-model-variant‹ relationships', async () => {
        await request(app)
            .get('/programme-episodes/123/features-car-model-variant')

        expect(ProgrammeEpisodeController.getAllFeaturesCarModelVariantRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›features-car-model-variant‹ relationship', async () => {
        await request(app)
            .delete('/programme-episodes/123/features-car-model-variant/456')

        expect(ProgrammeEpisodeController.deleteFeaturesCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })
})
