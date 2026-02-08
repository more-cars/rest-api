import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {SessionResultNode} from "../../../../../../src/models/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../src/models/session-results/SessionResult"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all SESSION RESULT nodes" request returns the correct number of nodes', () => {
    test('when there exist NO session result nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.SESSION_RESULT)

        const expectedNodes: Array<SessionResultNode> = []
        const actualNodes = await SessionResult.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist session result nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.SESSION_RESULT)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.SESSION_RESULT, amount)

        const actualNodes = await SessionResult.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
