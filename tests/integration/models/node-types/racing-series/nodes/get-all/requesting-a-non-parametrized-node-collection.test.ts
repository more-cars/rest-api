import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RacingSeriesNode} from "../../../../../../../src/models/node-types/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A non-parametrized "get all RACING SERIES nodes" request returns the correct number of nodes', () => {
    test('when there exist no RACING SERIES nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingSeries)

        const expectedNodes: RacingSeriesNode[] = []
        const actualNodes = await RacingSeries.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist racing series nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingSeries)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.RacingSeries, amount)

        const actualNodes = await RacingSeries.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
