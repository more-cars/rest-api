import {describe, expect, test} from 'vitest'
import {Book} from "../../../../../../../src/models/node-types/books/Book"
import {FakeBook} from "../../../../../../_toolbox/fixtures/nodes/FakeBook"
import type {BookInput} from "../../../../../../../src/models/node-types/books/types/BookInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a BOOK', () => {
    test('Node does not exist', async () => {
        await expect(Book.update(-42, FakeBook.dbInput() as BookInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.Book)
        const inputData = FakeBook.dbInput()
        const updatedNode = await Book.update(createdNode.properties.id, inputData as BookInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.Book)
        const validData = FakeBook.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await Book.update(createdNode.properties.id, inputData as BookInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
