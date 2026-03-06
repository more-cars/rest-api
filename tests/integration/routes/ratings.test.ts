import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RatingController} from "../../../src/controllers/node-types/RatingController"

describe('Ratings', () => {
    vi.mock("../../../src/controllers/node-types/RatingController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/ratings')

        expect(RatingController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/ratings/123')

        expect(RatingController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/ratings')

        expect(RatingController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/ratings/123')

        expect(RatingController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›by-magazine-issue‹ relationship', async () => {
        await request(app)
            .post('/ratings/123/by-magazine-issue/456')

        expect(RatingController.createByMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›by-magazine-issue‹ relationship', async () => {
        await request(app)
            .get('/ratings/123/by-magazine-issue')

        expect(RatingController.getByMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })
})
