import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../../src/app"
import {BookController} from "../../../../src/controllers/node-types/BookController"

vi.mock("../../../../src/controllers/node-types/BookController.ts", {spy: true})

describe('Books', () => {
    test('Create Node', async () => {
        await request(app)
            .post('/books')

        expect(BookController.create)
            .toHaveBeenCalledTimes(1)
    })
})
