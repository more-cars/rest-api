import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RacingSeriesNode} from "../../../../../../src/models/node-types/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../src/models/node-types/racing-series/RacingSeries"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all RACING SERIES nodes" request returns only the matching nodes', () => {
    test('when there exist no RACING SERIES nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_SERIES)

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
        await deleteAllNodesOfType(ControllerNodeType.RACING_SERIES)
        const nodeA = await seedNode(ControllerNodeType.RACING_SERIES, {
            name: 'A Node'
        }) as unknown as RacingSeriesNode
        await seedNode(ControllerNodeType.RACING_SERIES, {name: 'B Node'})
        await seedNode(ControllerNodeType.RACING_SERIES, {name: 'C Node'})

        const filteredNodes = await RacingSeries.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.attributes.name)
    })
})
