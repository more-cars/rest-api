import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RacingGameNode} from "../../../../../../src/models/node-types/racing-games/types/RacingGameNode"
import {RacingGame} from "../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all RACING GAME nodes" request returns the correct number of nodes', () => {
    test('when there exist no RACING GAME nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_GAME)

        const expectedNodes: RacingGameNode[] = []
        const actualNodes = await RacingGame.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING GAME nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_GAME)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(ControllerNodeType.RACING_GAME, amount)

        const actualNodes = await RacingGame.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
