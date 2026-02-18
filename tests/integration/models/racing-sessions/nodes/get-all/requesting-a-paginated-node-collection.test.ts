import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSessionNode} from "../../../../../../src/models/node-types/racing-sessions/types/RacingSessionNode"
import {RacingSession} from "../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all RACING SESSION nodes" request returns the correct number of nodes', () => {
    test('when there exist no RACING SESSION nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SESSION)

        const expectedNodes: RacingSessionNode[] = []
        const actualNodes = await RacingSession.findAll({page: 1})

        expect(expectedNodes)
            .toEqual(actualNodes)
    })

    test('when there exist RACING SESSION nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SESSION)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.RACING_SESSION, amount)

        const actualNodes = await RacingSession.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
