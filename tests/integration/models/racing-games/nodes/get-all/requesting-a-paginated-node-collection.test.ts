import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingGameNode} from "../../../../../../src/models/racing-games/types/RacingGameNode"
import {RacingGame} from "../../../../../../src/models/racing-games/RacingGame"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all RACING GAME nodes" request returns the correct number of nodes', () => {
    test('when there exist no RACING GAME nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_GAME)

        const expectedNodes: RacingGameNode[] = []
        const actualNodes = await RacingGame.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING GAME nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_GAME)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.RACING_GAME, amount)

        const actualNodes = await RacingGame.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
