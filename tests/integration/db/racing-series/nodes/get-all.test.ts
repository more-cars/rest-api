import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {RacingSeriesNode} from "../../../../../src/db/node-types/racing-series/types/RacingSeriesNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/node-types/racing-series/getAllNodesOfType"

test('When there are no RACING SERIES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.RacingSeries)

    const expectedRacingSeries: RacingSeriesNode[] = []
    const actualRacingSeries = await getAllNodesOfType()

    expect(actualRacingSeries)
        .toEqual(expectedRacingSeries)
})

test('When RACING SERIES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.RacingSeries)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.RacingSeries, amount)

    const actualRacingSeries = await getAllNodesOfType()

    expect(actualRacingSeries.length)
        .toEqual(amount)
})
