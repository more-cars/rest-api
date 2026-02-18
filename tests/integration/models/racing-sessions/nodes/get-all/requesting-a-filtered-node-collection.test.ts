import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingSessionNode} from "../../../../../../src/models/node-types/racing-sessions/types/RacingSessionNode"
import {RacingSession} from "../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all RACING SESSION nodes" request returns only the matching nodes', () => {
    test('when there exist no RACING SESSION nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SESSION)

        const expectedNodes: RacingSessionNode[] = []
        const actualNodes = await RacingSession.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING SESSION nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SESSION)
        const nodeA = await seedNode(NodeTypeEnum.RACING_SESSION, {name: 'A Node'}) as RacingSessionNode
        await seedNode(NodeTypeEnum.RACING_SESSION, {name: 'B Node'})
        await seedNode(NodeTypeEnum.RACING_SESSION, {name: 'C Node'})

        const filteredNodes = await RacingSession.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
