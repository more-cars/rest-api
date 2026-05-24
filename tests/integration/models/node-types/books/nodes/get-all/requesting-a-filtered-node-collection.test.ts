import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {BookNode} from "../../../../../../../src/db/node-types/books/types/BookNode"
import {Book} from "../../../../../../../src/models/node-types/books/Book"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all BOOK nodes" request returns only the matching nodes', () => {
    test('when there exist no BOOK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Book)

        const expectedNodes: BookNode[] = []
        const actualNodes = await Book.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist BOOK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Book)
        const nodeA = await seedNode(DbNodeType.Book, {name: 'A Node'}) as BookNode
        await seedNode(DbNodeType.Book, {name: 'B Node'})
        await seedNode(DbNodeType.Book, {name: 'C Node'})

        const filteredNodes = await Book.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.title === nodeA.properties.title)
    })
})
