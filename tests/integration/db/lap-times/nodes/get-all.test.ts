import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {LapTimeNode} from "../../../../../src/db/nodes/lap-times/types/LapTimeNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/lap-times/getAllNodesOfType"

test('When there are no LAP TIMES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.LapTime)

    const expectedLapTimes: LapTimeNode[] = []
    const actualLapTimes = await getAllNodesOfType()

    expect(actualLapTimes)
        .toEqual(expectedLapTimes)
})

test('When LAP TIMES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.LapTime)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(DbNodeType.LapTime, amount)

    const actualLapTimes = await getAllNodesOfType()

    expect(actualLapTimes.length)
        .toEqual(amount)
})
