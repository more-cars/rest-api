import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {SessionResultNode} from "../../../../../../src/models/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../src/models/session-results/SessionResult"
import {seedSessionResult} from "../../../../../_toolbox/dbSeeding/session-results/nodes/seedSessionResult"

describe('A sorted "get all SESSION RESULT nodes" request returns the nodes in correct order', () => {
    test('when there exist NO session result nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.SESSION_RESULT)

        const expectedNodes: Array<SessionResultNode> = []
        const actualNodes = await SessionResult.findAll({sortByProperty: 'position', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist session result nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.SESSION_RESULT)
        const nodeA = await seedSessionResult({position: 1})
        const nodeB = await seedSessionResult({position: 2})
        const nodeC = await seedSessionResult({position: 3})

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
