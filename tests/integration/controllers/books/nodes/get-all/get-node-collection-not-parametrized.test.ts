import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {Book} from "../../../../../../src/models/node-types/books/Book"
import {FakeBook} from "../../../../../_toolbox/fixtures/nodes/FakeBook"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        Book.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/books')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        Book.findAll = vi.fn().mockReturnValue([
            FakeBook.modelOutput(),
            FakeBook.modelOutput(),
            FakeBook.modelOutput(),
        ])

        const response = await request(app)
            .get('/books')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Book.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/books')

        expect(response.statusCode)
            .toBe(500)
    })
})
