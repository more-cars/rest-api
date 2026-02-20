import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {TrackLayoutNode} from "../../../../../../src/db/nodes/track-layouts/types/TrackLayoutNode"
import {TrackLayout} from "../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all TRACK LAYOUT nodes" request returns the nodes in correct order', () => {
    test('when there exist no TRACK LAYOUT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.TRACK_LAYOUT)

        const expectedNodes: TrackLayoutNode[] = []
        const actualNodes = await TrackLayout.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist TRACK LAYOUT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.TRACK_LAYOUT)
        const nodeA = await seedNode(ControllerNodeType.TRACK_LAYOUT, {name: 'A Node'}) as unknown as TrackLayoutNode
        const nodeB = await seedNode(ControllerNodeType.TRACK_LAYOUT, {name: 'B Node'}) as unknown as TrackLayoutNode
        const nodeC = await seedNode(ControllerNodeType.TRACK_LAYOUT, {name: 'C Node'}) as unknown as TrackLayoutNode

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
