import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {BookNode} from "../../../../../../../src/models/node-types/books/types/BookNode"
import {Book} from "../../../../../../../src/models/node-types/books/Book"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all BOOK nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no BOOK nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.Book)

        const expectedNodes: BookNode[] = []
        const actualNodes = await Book.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 BOOK nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.Book)
        await seedNodes(DbNodeType.Book, totalNodeAmount)

        const actualNodes = await Book.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
