import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {SessionResultNode} from "../../../../../../src/models/node-types/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all SESSION RESULT nodes" request returns the nodes in correct order', () => {
    test('when there exist no SESSION RESULT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.SESSION_RESULT)

        const expectedNodes: SessionResultNode[] = []
        const actualNodes = await SessionResult.findAll({sortByProperty: 'position', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist SESSION RESULT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.SESSION_RESULT)
        const nodeA = await seedNode(NodeTypeEnum.SESSION_RESULT, {position: 1}) as SessionResultNode
        const nodeB = await seedNode(NodeTypeEnum.SESSION_RESULT, {position: 2}) as SessionResultNode
        const nodeC = await seedNode(NodeTypeEnum.SESSION_RESULT, {position: 3}) as SessionResultNode

        const ascNodes = await SessionResult.findAll({sortByProperty: 'position', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].position === nodeA.position)
        expect(ascNodes[1].position === nodeB.position)
        expect(ascNodes[2].position === nodeC.position)

        const descNodes = await SessionResult.findAll({sortByProperty: 'position', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].position === nodeC.position)
        expect(descNodes[1].position === nodeB.position)
        expect(descNodes[2].position === nodeA.position)
    })
})
