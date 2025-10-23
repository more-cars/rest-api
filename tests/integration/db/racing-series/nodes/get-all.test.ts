import {expect, test} from 'vitest'
import {deleteAllRacingSeries} from "../../../../_toolbox/dbSeeding/racing-series/nodes/deleteAllRacingSeries"
import {RacingSeriesNode} from "../../../../../src/db/nodes/racing-series/types/RacingSeriesNode"
import {seedRacingSeriess} from "../../../../_toolbox/dbSeeding/racing-series/nodes/seedRacingSeriess"
import {getAllNodesOfType} from "../../../../../src/db/nodes/racing-series/getAllNodesOfType"

test('When there are no RACING SERIES then an empty array should be returned', async () => {
    await deleteAllRacingSeries()

    const expectedRacingSeries: Array<RacingSeriesNode> = []
    const actualRacingSeries = await getAllNodesOfType()

    expect(actualRacingSeries)
        .toEqual(expectedRacingSeries)
})

test('When RACING SERIES exist then all of them should be returned', async () => {
    await deleteAllRacingSeries()
    const amount = Math.ceil(Math.random() * 50)
    await seedRacingSeriess(amount)

    const actualRacingSeries = await getAllNodesOfType()

    expect(actualRacingSeries.length)
        .toEqual(amount)
})
