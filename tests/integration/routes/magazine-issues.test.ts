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
})
