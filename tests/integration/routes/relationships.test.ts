import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RelationshipController} from "../../../src/controllers/RelationshipController"

describe('Relationships', () => {
    vi.mock("../../../src/controllers/RelationshipController.ts", {spy: true})

    test('Get Node by ID', async () => {
        await request(app)
            .get('/relationships/123')

        expect(RelationshipController.getById)
            .toHaveBeenCalledTimes(1)
    })
})
