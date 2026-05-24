import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Book} from "../../../../../src/models/node-types/books/Book"
import {FakeBook} from "../../../../_toolbox/fixtures/nodes/FakeBook"

test('Input data is valid', async () => {
    Book.create = vi.fn().mockReturnValue(FakeBook.modelOutput())

    const response = await request(app)
        .post('/books')
        .send({
            title: "Living the Supercar Dream",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/books')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/books') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    Book.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/books')
        .send({
            title: "Living the Supercar Dream",
        })

    expect(response.statusCode)
        .toBe(500)
})
