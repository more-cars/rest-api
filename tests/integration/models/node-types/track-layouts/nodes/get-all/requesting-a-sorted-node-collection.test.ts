import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {TrackLayoutNode} from "../../../../../../../src/db/node-types/track-layouts/types/TrackLayoutNode"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A sorted "get all TRACK LAYOUT nodes" request returns the nodes in correct order', () => {
    test('when there exist no TRACK LAYOUT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.TrackLayout)

        const expectedNodes: TrackLayoutNode[] = []
        const actualNodes = await TrackLayout.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist TRACK LAYOUT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.TrackLayout)
        const nodeA = await seedNode(DbNodeType.TrackLayout, {name: 'A Node'}) as TrackLayoutNode
        const nodeB = await seedNode(DbNodeType.TrackLayout, {name: 'B Node'}) as TrackLayoutNode
        const nodeC = await seedNode(DbNodeType.TrackLayout, {name: 'C Node'}) as TrackLayoutNode

        const ascNodes = await TrackLayout.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await TrackLayout.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
