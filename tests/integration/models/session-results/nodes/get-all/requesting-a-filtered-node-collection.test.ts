import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {SessionResultNode} from "../../../../../../src/models/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../src/models/session-results/SessionResult"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedSessionResult} from "../../../../../_toolbox/dbSeeding/session-results/nodes/seedSessionResult"

describe('A filtered "get all SESSION RESULT nodes" request returns only the matching nodes', () => {
    test('when there exist NO Session Result nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.SESSION_RESULT)

        const expectedNodes: Array<SessionResultNode> = []
        const actualNodes = await SessionResult.findAll({
            filterByProperty: 'position',
            filterValue: 1,
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist Session Result nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.SESSION_RESULT)
        const nodeA = await seedSessionResult({position: 1})
        await seedSessionResult({position: 2})
        await seedSessionResult({position: 3})

        const filteredNodes = await SessionResult.findAll({
            filterByProperty: 'position',
            filterValue: 1,
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].position === nodeA.position)
    })
})
