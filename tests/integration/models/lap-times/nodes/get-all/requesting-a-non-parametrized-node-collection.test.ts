import {describe, expect, test} from 'vitest'
import {deleteAllLapTimes} from "../../../../../_toolbox/dbSeeding/lap-times/nodes/deleteAllLapTimes"
import type {LapTimeNode} from "../../../../../../src/models/lap-times/types/LapTimeNode"
import {LapTime} from "../../../../../../src/models/lap-times/LapTime"
import {seedLapTimes} from "../../../../../_toolbox/dbSeeding/lap-times/nodes/seedLapTimes"

describe('A non-parametrized "get all LAP TIME nodes" request returns the correct number of nodes', () => {
    test('when there exist NO lap time nodes', async () => {
        await deleteAllLapTimes()

        const expectedNodes: Array<LapTimeNode> = []
        const actualNodes = await LapTime.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist lap time nodes', async () => {
        await deleteAllLapTimes()
        const amount = Math.ceil(Math.random() * 20)
        await seedLapTimes(amount)

        const actualNodes = await LapTime.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
