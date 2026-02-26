import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {MagazineController} from "../../../src/controllers/node-types/MagazineController"

describe('Magazines', () => {
    vi.mock("../../../src/controllers/node-types/MagazineController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/magazines')

        expect(MagazineController.create)
            .toHaveBeenCalledTimes(1)
    })
})
