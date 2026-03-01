import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {MagazineIssueController} from "../../../src/controllers/node-types/MagazineIssueController"

describe('Magazine Issues', () => {
    vi.mock("../../../src/controllers/node-types/MagazineIssueController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/magazine-issues')

        expect(MagazineIssueController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/magazine-issues/123')

        expect(MagazineIssueController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/magazine-issues')

        expect(MagazineIssueController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/magazine-issues/123')

        expect(MagazineIssueController.delete)
            .toHaveBeenCalledTimes(1)
    })
})
