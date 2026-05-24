import {describe, expect, test} from 'vitest'
import {Book} from "../../../../../../src/models/node-types/books/Book"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a BOOK', () => {
    test('that does not exist', async () => {
        await expect(Book.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.Book)
        await expect(Book.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
