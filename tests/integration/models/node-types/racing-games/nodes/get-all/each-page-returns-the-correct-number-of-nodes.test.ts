import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RacingGameNode} from "../../../../../../../src/models/node-types/racing-games/types/RacingGameNode"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Each page of a "get all RACING GAME nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no RACING GAME nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.RacingGame)

        const expectedNodes: RacingGameNode[] = []
        const actualNodes = await RacingGame.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 RACING GAME nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.RacingGame)
        await seedNodes(DbNodeType.RacingGame, totalNodeAmount)

        const actualNodes = await RacingGame.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
