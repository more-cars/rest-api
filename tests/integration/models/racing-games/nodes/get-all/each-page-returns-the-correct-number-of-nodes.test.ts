import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RacingGameNode} from "../../../../../../src/models/node-types/racing-games/types/RacingGameNode"
import {RacingGame} from "../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all RACING GAME nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no RACING GAME nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_GAME)

        const expectedNodes: RacingGameNode[] = []
        const actualNodes = await RacingGame.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 RACING GAME nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_GAME)
        await seedNodes(ControllerNodeType.RACING_GAME, totalNodeAmount)

        const actualNodes = await RacingGame.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
