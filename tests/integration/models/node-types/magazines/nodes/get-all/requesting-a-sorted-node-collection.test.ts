import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MagazineNode} from "../../../../../../../src/db/node-types/magazines/types/MagazineNode"
import {Magazine} from "../../../../../../../src/models/node-types/magazines/Magazine"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all MAGAZINE nodes" request returns the nodes in correct order', () => {
    test('when there exist no MAGAZINE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Magazine)

        const expectedNodes: MagazineNode[] = []
        const actualNodes = await Magazine.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MAGAZINE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Magazine)
        const nodeA = await seedNode(DbNodeType.Magazine, {name: 'A Node'}) as MagazineNode
        const nodeB = await seedNode(DbNodeType.Magazine, {name: 'B Node'}) as MagazineNode
        const nodeC = await seedNode(DbNodeType.Magazine, {name: 'C Node'}) as MagazineNode

        const ascNodes = await Magazine.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await Magazine.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
