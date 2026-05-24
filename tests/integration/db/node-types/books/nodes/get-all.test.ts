import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {BookNode} from "../../../../../../src/db/node-types/books/types/BookNode"
import {fetchNodesFromDb} from "../../../../../../src/db/nodes/fetchNodesFromDb"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

test('When there are no BOOKS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Book)

    const expectedBooks: BookNode[] = []
    const actualBooks = await fetchNodesFromDb(DbNodeType.Book)

    expect(actualBooks)
        .toEqual(expectedBooks)
})

test('When BOOKS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Book)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.Book, amount)

    const actualBooks = await fetchNodesFromDb(DbNodeType.Book)

    expect(actualBooks.length)
        .toEqual(amount)
})
