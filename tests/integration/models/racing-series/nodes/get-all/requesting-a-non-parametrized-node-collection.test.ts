import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingSeriesNode} from "../../../../../../src/models/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../src/models/racing-series/RacingSeries"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all RACING SERIES nodes" request returns the correct number of nodes', () => {
    test('when there exist no RACING SERIES nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SERIES)

        const expectedNodes: Array<RacingSeriesNode> = []
        const actualNodes = await RacingSeries.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist racing series nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SERIES)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.RACING_SERIES, amount)

        const actualNodes = await RacingSeries.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
