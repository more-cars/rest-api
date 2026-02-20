import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {SessionResultNode} from "../../../../../../src/db/nodes/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all SESSION RESULT nodes" request returns the nodes in correct order', () => {
    test('when there exist no SESSION RESULT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.SESSION_RESULT)

        const expectedNodes: SessionResultNode[] = []
        const actualNodes = await SessionResult.findAll({sortByProperty: 'position', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist SESSION RESULT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.SESSION_RESULT)
        const nodeA = await seedNode(ControllerNodeType.SESSION_RESULT, {position: 1}) as unknown as SessionResultNode
        const nodeB = await seedNode(ControllerNodeType.SESSION_RESULT, {position: 2}) as unknown as SessionResultNode
        const nodeC = await seedNode(ControllerNodeType.SESSION_RESULT, {position: 3}) as unknown as SessionResultNode

        const ascNodes = await SessionResult.findAll({sortByProperty: 'position', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.position === nodeA.properties.position)
        expect(ascNodes[1].attributes.position === nodeB.properties.position)
        expect(ascNodes[2].attributes.position === nodeC.properties.position)

        const descNodes = await SessionResult.findAll({sortByProperty: 'position', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.position === nodeC.properties.position)
        expect(descNodes[1].attributes.position === nodeB.properties.position)
        expect(descNodes[2].attributes.position === nodeA.properties.position)
    })
})
