import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RacingSeriesNode} from "../../../../../../src/models/node-types/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all RACING SERIES nodes" request returns the nodes in correct order', () => {
    test('when there exist no RACING SERIES nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_SERIES)

        const expectedNodes: RacingSeriesNode[] = []
        const actualNodes = await RacingSeries.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist racing series nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_SERIES)
        const nodeA = await seedNode(ControllerNodeType.RACING_SERIES, {name: 'A Node'}) as RacingSeriesNode
        const nodeB = await seedNode(ControllerNodeType.RACING_SERIES, {name: 'B Node'}) as RacingSeriesNode
        const nodeC = await seedNode(ControllerNodeType.RACING_SERIES, {name: 'C Node'}) as RacingSeriesNode

        const ascNodes = await RacingSeries.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await RacingSeries.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
