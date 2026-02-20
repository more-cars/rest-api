import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {SessionResultNode} from "../../../../../../src/models/node-types/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../src/models/node-types/session-results/SessionResult"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all SESSION RESULT nodes" request returns only the matching nodes', () => {
    test('when there exist no SESSION RESULT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.SESSION_RESULT)

        const expectedNodes: SessionResultNode[] = []
        const actualNodes = await SessionResult.findAll({
            filterByProperty: 'position',
            filterValue: 1,
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist SESSION RESULT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.SESSION_RESULT)
        const nodeA = await seedNode(ControllerNodeType.SESSION_RESULT, {position: 1}) as unknown as SessionResultNode
        await seedNode(ControllerNodeType.SESSION_RESULT, {position: 2})
        await seedNode(ControllerNodeType.SESSION_RESULT, {position: 3})

        const filteredNodes = await SessionResult.findAll({
            filterByProperty: 'position',
            filterValue: 1,
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.position === nodeA.properties.position)
    })
})
