import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingEventNode} from "../../../../../../src/models/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {seedRacingEvents} from "../../../../../_toolbox/dbSeeding/racing-events/nodes/seedRacingEvents"

describe('Each page of a "get all RACING EVENT nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO racing event nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)

        const expectedNodes: Array<RacingEventNode> = []
        const actualNodes = await RacingEvent.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 racing event nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)
        await seedRacingEvents(totalNodeAmount)

        const actualNodes = await RacingEvent.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
