import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {SessionResultNode} from "../../../../../../../src/db/node-types/session-results/types/SessionResultNode"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A filtered "get all SESSION RESULT nodes" request returns only the matching nodes', () => {
    test('when there exist no SESSION RESULT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.SessionResult)

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
        await deleteAllNodesOfType(DbNodeType.SessionResult)
        const nodeA = await seedNode(DbNodeType.SessionResult, {position: 1}) as SessionResultNode
        await seedNode(DbNodeType.SessionResult, {position: 2})
        await seedNode(DbNodeType.SessionResult, {position: 3})

        const filteredNodes = await SessionResult.findAll({
            filterByProperty: 'position',
            filterValue: 1,
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.position === nodeA.properties.position)
    })
})
