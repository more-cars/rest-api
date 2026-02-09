import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingEventNode} from "../../../../../../src/models/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all RACING EVENT nodes" request returns only the matching nodes', () => {
    test('when there exist no RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)

        const expectedNodes: RacingEventNode[] = []
        const actualNodes = await RacingEvent.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)
        const nodeA = await seedNode(NodeTypeEnum.RACING_EVENT, {name: 'A Node'}) as RacingEventNode
        await seedNode(NodeTypeEnum.RACING_EVENT, {name: 'B Node'})
        await seedNode(NodeTypeEnum.RACING_EVENT, {name: 'C Node'})

        const filteredNodes = await RacingEvent.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
