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

    test('Get Node by ID', async () => {
        await request(app)
            .get('/books/123')

        expect(BookController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/books')

        expect(BookController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Update Node', async () => {
        await request(app)
            .patch('/books/123')

        expect(BookController.update)
            .toHaveBeenCalledTimes(1)

    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/books/123')

        expect(BookController.delete)
            .toHaveBeenCalledTimes(1)
    })
})
