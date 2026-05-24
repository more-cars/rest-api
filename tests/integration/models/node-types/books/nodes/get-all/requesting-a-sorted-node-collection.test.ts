import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {BookNode} from "../../../../../../../src/db/node-types/books/types/BookNode"
import {Book} from "../../../../../../../src/models/node-types/books/Book"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all BOOK nodes" request returns the nodes in correct order', () => {
    test('when there exist no BOOK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Book)

        const expectedNodes: BookNode[] = []
        const actualNodes = await Book.findAll({sortByProperty: 'title', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist BOOK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Book)
        const nodeA = await seedNode(DbNodeType.Book, {title: 'A Node'}) as BookNode
        const nodeB = await seedNode(DbNodeType.Book, {title: 'B Node'}) as BookNode
        const nodeC = await seedNode(DbNodeType.Book, {title: 'C Node'}) as BookNode

        const ascNodes = await Book.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.title === nodeA.properties.title)
        expect(ascNodes[1].attributes.title === nodeB.properties.title)
        expect(ascNodes[2].attributes.title === nodeC.properties.title)

        const descNodes = await Book.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.title === nodeC.properties.title)
        expect(descNodes[1].attributes.title === nodeB.properties.title)
        expect(descNodes[2].attributes.title === nodeA.properties.title)
    })
})
