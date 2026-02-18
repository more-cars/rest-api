import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {RelationshipController} from "../../../src/controllers/RelationshipController"

describe('Relationships', () => {
    vi.mock("../../../src/controllers/node-types/RelationshipController.ts", {spy: true})

    test('Get relationship by ID', async () => {
        await request(app)
            .get('/relationships/123')

        expect(RelationshipController.getById)
            .toHaveBeenCalledTimes(1)
    })
})
