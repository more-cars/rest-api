import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Book} from "../../../../../src/models/node-types/books/Book"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeBook} from "../../../../_toolbox/fixtures/nodes/FakeBook"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update BOOK', () => {
    test('Node does not exist', async () => {
        vi.spyOn(Book, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/books/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        Book.update = vi.fn().mockReturnValue(FakeBook.modelOutput())

        const response = await request(app)
            .patch('/books/42')
            .send({
                "title": "Living the Supercar Dream - Updated",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test('Request is empty', async () => {
        Book.update = vi.fn().mockReturnValue(FakeBook.modelOutput())

        const response = await request(app)
            .patch('/books/42') // payload is missing

        expect(response.statusCode)
            .toBe(200)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.Book)
        const inputData = createdNode.properties
        inputData.name = null

        const response = await request(app)
            .patch('/books/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.Book)
        const inputData = createdNode.properties
        inputData.author = null

        const response = await request(app)
            .patch('/books/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Book.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/books/42')
            .send({
                "title": "Living the Supercar Dream - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
