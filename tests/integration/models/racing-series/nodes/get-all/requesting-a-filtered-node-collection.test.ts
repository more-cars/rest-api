import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingSeriesNode} from "../../../../../../src/models/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../src/models/racing-series/RacingSeries"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all RACING SERIES nodes" request returns only the matching nodes', () => {
    test('when there exist no RACING SERIES nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SERIES)

        const expectedNodes: RacingSeriesNode[] = []
        const actualNodes = await RacingSeries.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING SERIES nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SERIES)
        const nodeA = await seedNode(NodeTypeEnum.RACING_SERIES, {name: 'A Node'}) as RacingSeriesNode
        await seedNode(NodeTypeEnum.RACING_SERIES, {name: 'B Node'})
        await seedNode(NodeTypeEnum.RACING_SERIES, {name: 'C Node'})

        const filteredNodes = await RacingSeries.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
