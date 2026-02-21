import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RacingSeriesNode} from "../../../../../../src/models/node-types/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all RACING SERIES nodes" request returns the correct number of nodes', () => {
    test('when there exist no RACING SERIES nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RacingSeries)

        const expectedNodes: RacingSeriesNode[] = []
        const actualNodes = await RacingSeries.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist racing series nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RacingSeries)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(ControllerNodeType.RacingSeries, amount)

        const actualNodes = await RacingSeries.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
