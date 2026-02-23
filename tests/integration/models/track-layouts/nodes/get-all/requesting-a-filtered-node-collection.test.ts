import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {TrackLayoutNode} from "../../../../../../src/db/node-types/track-layouts/types/TrackLayoutNode"
import {TrackLayout} from "../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A filtered "get all TRACK LAYOUT nodes" request returns only the matching nodes', () => {
    test('when there exist no TRACK LAYOUT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.TrackLayout)

        const expectedNodes: TrackLayoutNode[] = []
        const actualNodes = await TrackLayout.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist TRACK LAYOUT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.TrackLayout)
        const nodeA = await seedNode(DbNodeType.TrackLayout, {
            name: 'A Node'
        }) as unknown as TrackLayoutNode
        await seedNode(DbNodeType.TrackLayout, {name: 'B Node'})
        await seedNode(DbNodeType.TrackLayout, {name: 'C Node'})

        const filteredNodes = await TrackLayout.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
