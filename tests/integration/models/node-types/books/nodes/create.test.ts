import {expect, test} from 'vitest'
import {FakeBook} from "../../../../../_toolbox/fixtures/nodes/FakeBook"
import {Book} from "../../../../../../src/models/node-types/books/Book"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeBook.dbInput()
    const createdNode = await Book.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeBook.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await Book.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
