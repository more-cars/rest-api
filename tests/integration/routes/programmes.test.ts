import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {ProgrammeController} from "../../../src/controllers/node-types/ProgrammeController"

describe('Programmes', () => {
    vi.mock("../../../src/controllers/node-types/ProgrammeController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/programmes')

        expect(ProgrammeController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/programmes/123')

        expect(ProgrammeController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/programmes')

        expect(ProgrammeController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/programmes/123')

        expect(ProgrammeController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-episode‹ relationship', async () => {
        await request(app)
            .post('/programmes/123/has-episode/456')

        expect(ProgrammeController.createHasEpisodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-episode‹ relationships', async () => {
        await request(app)
            .get('/programmes/123/has-episode')

        expect(ProgrammeController.getAllHasEpisodeRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-episode‹ relationship', async () => {
        await request(app)
            .delete('/programmes/123/has-episode/456')

        expect(ProgrammeController.deleteHasEpisodeRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/programmes/123/has-image/456')

        expect(ProgrammeController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/programmes/123/has-image')

        expect(ProgrammeController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })
})
