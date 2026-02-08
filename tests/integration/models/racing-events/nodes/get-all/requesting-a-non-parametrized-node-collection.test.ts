import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingEventNode} from "../../../../../../src/models/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {seedRacingEvents} from "../../../../../_toolbox/dbSeeding/racing-events/nodes/seedRacingEvents"

describe('A non-parametrized "get all RACING EVENT nodes" request returns the correct number of nodes', () => {
    test('when there exist NO racing event nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)

        const expectedNodes: Array<RacingEventNode> = []
        const actualNodes = await RacingEvent.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist racing event nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)
        const amount = Math.ceil(Math.random() * 20)
        await seedRacingEvents(amount)

        const actualNodes = await RacingEvent.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
