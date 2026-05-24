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

    test('Create ›covers-car-model-variant‹ relationship', async () => {
        await request(app)
            .post('/books/123/covers-car-model-variant/456')

        expect(BookController.createCoversCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›covers-car-model-variant‹ relationships', async () => {
        await request(app)
            .get('/books/123/covers-car-model-variant')

        expect(BookController.getAllCoversCarModelVariantRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›covers-car-model-variant‹ relationship', async () => {
        await request(app)
            .delete('/books/123/covers-car-model-variant/456')

        expect(BookController.deleteCoversCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })
})
