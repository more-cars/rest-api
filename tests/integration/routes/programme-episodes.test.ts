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
})
