import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {SessionResultNode} from "../../../../../../../src/models/node-types/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A paginated "get all SESSION RESULT nodes" request returns the correct number of nodes', () => {
    test('when there exist no SESSION RESULT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.SessionResult)

        const expectedNodes: SessionResultNode[] = []
        const actualNodes = await SessionResult.findAll({page: 1})

        expect(expectedNodes)
            .toEqual(actualNodes)
    })

    test('when there exist SESSION RESULT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.SessionResult)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.SessionResult, amount)

        const actualNodes = await SessionResult.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
