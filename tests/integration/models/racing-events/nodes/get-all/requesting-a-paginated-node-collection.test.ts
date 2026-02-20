import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEventNode} from "../../../../../../src/models/node-types/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all RACING EVENT nodes" request returns the correct number of nodes', () => {
    test('when there exist no RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_EVENT)

        const expectedNodes: RacingEventNode[] = []
        const actualNodes = await RacingEvent.findAll({page: 1})

        expect(expectedNodes)
            .toEqual(actualNodes)
    })

    test('when there exist RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_EVENT)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(ControllerNodeType.RACING_EVENT, amount)

        const actualNodes = await RacingEvent.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
