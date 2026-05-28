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
            .post('/books/123/relationships/covers-car-model-variant')
            .send({
                data: {
                    type: "covers-car-model-variant",
                    id: 456,
                }
            })

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
            .delete('/books/123/relationships/covers-car-model-variant')
            .send({
                data: {
                    type: "covers-car-model-variant",
                    id: 456,
                },
            })

        expect(BookController.deleteCoversCarModelVariantRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/books/123/relationships/has-image')
            .send({
                data: {
                    type: "has-image",
                    id: 456,
                }
            })

        expect(BookController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/books/123/has-image')

        expect(BookController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/books/123/relationships/has-image')
            .send({
                data: {
                    type: "has-image",
                    id: 456,
                },
            })

        expect(BookController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/books/123/relationships/has-prime-image')
            .send({
                data: {
                    type: "has-prime-image",
                    id: 456,
                }
            })

        expect(BookController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/books/123/has-prime-image')

        expect(BookController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/books/123/relationships/has-prime-image')
            .send({
                data: {
                    type: "has-prime-image",
                    id: 456,
                },
            })

        expect(BookController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-video‹ relationship', async () => {
        await request(app)
            .post('/books/123/relationships/has-video')
            .send({
                data: {
                    type: "has-video",
                    id: 456,
                }
            })

        expect(BookController.createHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-video‹ relationships', async () => {
        await request(app)
            .get('/books/123/has-video')

        expect(BookController.getAllHasVideoRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-video‹ relationship', async () => {
        await request(app)
            .delete('/books/123/relationships/has-video')
            .send({
                data: {
                    type: "has-video",
                    id: 456,
                },
            })

        expect(BookController.deleteHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-main-video‹ relationship', async () => {
        await request(app)
            .post('/books/123/relationships/has-main-video')
            .send({
                data: {
                    type: "has-main-video",
                    id: 456,
                }
            })

        expect(BookController.createHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-main-video‹ relationship', async () => {
        await request(app)
            .get('/books/123/has-main-video')

        expect(BookController.getHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-main-video‹ relationship', async () => {
        await request(app)
            .delete('/books/123/relationships/has-main-video')
            .send({
                data: {
                    type: "has-main-video",
                    id: 456,
                },
            })

        expect(BookController.deleteHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })
})
