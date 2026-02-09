import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingEventNode} from "../../../../../../src/models/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all RACING EVENT nodes" request returns the nodes in correct order', () => {
    test('when there exist no RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)

        const expectedNodes: RacingEventNode[] = []
        const actualNodes = await RacingEvent.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)
        const nodeA = await seedNode(NodeTypeEnum.RACING_EVENT, {name: 'A Node'}) as RacingEventNode
        const nodeB = await seedNode(NodeTypeEnum.RACING_EVENT, {name: 'B Node'}) as RacingEventNode
        const nodeC = await seedNode(NodeTypeEnum.RACING_EVENT, {name: 'C Node'}) as RacingEventNode

        const ascNodes = await RacingEvent.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await RacingEvent.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
