import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {BookNode} from "../../../../../../../src/models/node-types/books/types/BookNode"
import {Book} from "../../../../../../../src/models/node-types/books/Book"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all BOOK nodes" request returns the correct number of nodes', () => {
    test('when there exist no BOOK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Book)

        const expectedNodes: BookNode[] = []
        const actualNodes = await Book.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist BOOK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Book)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.Book, amount)

        const actualNodes = await Book.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
