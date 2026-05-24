import {describe, expect, test} from 'vitest'
import {Book} from "../../../../../../src/models/node-types/books/Book"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a BOOK', () => {
    test('which does not exist', async () => {
        await expect(Book.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedBook = await seedNode(DbNodeType.Book)
        const actualBook = await Book.findById(expectedBook.properties.id)

        expect(actualBook.attributes)
            .toEqual(expectedBook.properties)
    })
})
