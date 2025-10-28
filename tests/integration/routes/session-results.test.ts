import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {SessionResultController} from "../../../src/controllers/SessionResultController"

describe('Session Results', () => {
    vi.mock("../../../src/controllers/SessionResultController.ts", {spy: true})

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
})
