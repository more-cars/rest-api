import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RacingSessionNode} from "../../../../../../src/db/nodes/racing-sessions/types/RacingSessionNode"
import {RacingSession} from "../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all RACING SESSION nodes" request returns only the matching nodes', () => {
    test('when there exist no RACING SESSION nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RacingSession)

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
        await deleteAllNodesOfType(ControllerNodeType.RacingSession)
        const nodeA = await seedNode(ControllerNodeType.RacingSession, {
            name: 'A Node'
        }) as unknown as unknown as RacingSessionNode
        await seedNode(ControllerNodeType.RacingSession, {name: 'B Node'})
        await seedNode(ControllerNodeType.RacingSession, {name: 'C Node'})

        const filteredNodes = await RacingSession.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
