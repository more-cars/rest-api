import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSeriesNode} from "../../../../../src/db/nodes/racing-series/types/RacingSeriesNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/racing-series/getAllNodesOfType"

test('When there are no RACING SERIES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.RACING_SERIES)

    const expectedRacingSeries: RacingSeriesNode[] = []
    const actualRacingSeries = await getAllNodesOfType()

    expect(actualRacingSeries)
        .toEqual(expectedRacingSeries)
})

test('When RACING SERIES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.RACING_SERIES)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(ControllerNodeType.RACING_SERIES, amount)

    const actualRacingSeries = await getAllNodesOfType()

    expect(actualRacingSeries.length)
        .toEqual(amount)
})
