import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingEventNode} from "../../../../../../src/models/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {seedRacingEvent} from "../../../../../_toolbox/dbSeeding/racing-events/nodes/seedRacingEvent"

describe('A sorted "get all RACING EVENT nodes" request returns the nodes in correct order', () => {
    test('when there exist NO racing event nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)

        const expectedNodes: Array<RacingEventNode> = []
        const actualNodes = await RacingEvent.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist racing event nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)
        const nodeA = await seedRacingEvent({name: 'A Node'})
        const nodeB = await seedRacingEvent({name: 'B Node'})
        const nodeC = await seedRacingEvent({name: 'C Node'})

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
