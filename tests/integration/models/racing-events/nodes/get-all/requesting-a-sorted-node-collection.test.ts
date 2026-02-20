import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RacingEventNode} from "../../../../../../src/models/node-types/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all RACING EVENT nodes" request returns the nodes in correct order', () => {
    test('when there exist no RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_EVENT)

        const expectedNodes: RacingEventNode[] = []
        const actualNodes = await RacingEvent.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_EVENT)
        const nodeA = await seedNode(ControllerNodeType.RACING_EVENT, {
            name: 'A Node'
        }) as unknown as RacingEventNode
        const nodeB = await seedNode(ControllerNodeType.RACING_EVENT, {
            name: 'B Node'
        }) as unknown as RacingEventNode
        const nodeC = await seedNode(ControllerNodeType.RACING_EVENT, {
            name: 'C Node'
        }) as unknown as RacingEventNode

        const ascNodes = await RacingEvent.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await RacingEvent.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
