import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {SessionResultNode} from "../../../../../../../src/db/node-types/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A sorted "get all SESSION RESULT nodes" request returns the nodes in correct order', () => {
    test('when there exist no SESSION RESULT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.SessionResult)

        const expectedNodes: SessionResultNode[] = []
        const actualNodes = await SessionResult.findAll({sortByProperty: 'position', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist SESSION RESULT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.SessionResult)
        const nodeA = await seedNode(DbNodeType.SessionResult, {position: 1}) as SessionResultNode
        const nodeB = await seedNode(DbNodeType.SessionResult, {position: 2}) as SessionResultNode
        const nodeC = await seedNode(DbNodeType.SessionResult, {position: 3}) as SessionResultNode

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
