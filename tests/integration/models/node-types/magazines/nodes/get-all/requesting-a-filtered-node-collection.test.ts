import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MagazineNode} from "../../../../../../../src/db/node-types/magazines/types/MagazineNode"
import {Magazine} from "../../../../../../../src/models/node-types/magazines/Magazine"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all MAGAZINE nodes" request returns only the matching nodes', () => {
    test('when there exist no MAGAZINE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Magazine)

        const expectedNodes: MagazineNode[] = []
        const actualNodes = await Magazine.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MAGAZINE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Magazine)
        const nodeA = await seedNode(DbNodeType.Magazine, {name: 'A Node'}) as MagazineNode
        await seedNode(DbNodeType.Magazine, {name: 'B Node'})
        await seedNode(DbNodeType.Magazine, {name: 'C Node'})

        const filteredNodes = await Magazine.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
