import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RacingEventNode} from "../../../../../../src/models/node-types/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all RACING EVENT nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no RACING EVENT nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(ControllerNodeType.RacingEvent)

        const expectedNodes: RacingEventNode[] = []
        const actualNodes = await RacingEvent.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 RACING EVENT nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(ControllerNodeType.RacingEvent)
        await seedNodes(ControllerNodeType.RacingEvent, totalNodeAmount)

        const actualNodes = await RacingEvent.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
