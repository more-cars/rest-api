import {expect, test} from 'vitest'
import {deleteAllLapTimes} from "../../../../_toolbox/dbSeeding/lap-times/nodes/deleteAllLapTimes"
import {LapTimeNode} from "../../../../../src/db/nodes/lap-times/types/LapTimeNode"
import {seedLapTimes} from "../../../../_toolbox/dbSeeding/lap-times/nodes/seedLapTimes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/lap-times/getAllNodesOfType"

test('When there are no LAP TIMES then an empty array should be returned', async () => {
    await deleteAllLapTimes()

    const expectedLapTimes: Array<LapTimeNode> = []
    const actualLapTimes = await getAllNodesOfType()

    expect(actualLapTimes)
        .toEqual(expectedLapTimes)
})

test('When LAP TIMES exist then all of them should be returned', async () => {
    await deleteAllLapTimes()
    const amount = Math.ceil(Math.random() * 50)
    await seedLapTimes(amount)

    const actualLapTimes = await getAllNodesOfType()

    expect(actualLapTimes.length)
        .toEqual(amount)
})
