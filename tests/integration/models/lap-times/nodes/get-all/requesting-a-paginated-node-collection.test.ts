import {describe, expect, test} from 'vitest'
import {deleteAllLapTimes} from "../../../../../_toolbox/dbSeeding/lap-times/nodes/deleteAllLapTimes"
import type {LapTimeNode} from "../../../../../../src/models/lap-times/types/LapTimeNode"
import {LapTime} from "../../../../../../src/models/lap-times/LapTime"
import {seedLapTime} from "../../../../../_toolbox/dbSeeding/lap-times/nodes/seedLapTime"

describe('A sorted "get all LAP TIME nodes" request returns the nodes in correct order', () => {
    test('when there exist NO lap time nodes', async () => {
        await deleteAllLapTimes()

        const expectedNodes: Array<LapTimeNode> = []
        const actualNodes = await LapTime.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist lap time nodes', async () => {
        await deleteAllLapTimes()
        const nodeA = await seedLapTime({driver_name: 'A Node'})
        const nodeB = await seedLapTime({driver_name: 'B Node'})
        const nodeC = await seedLapTime({driver_name: 'C Node'})

        const ascNodes = await LapTime.findAll({sortByProperty: 'driver_name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].driver_name === nodeA.driver_name)
        expect(ascNodes[1].driver_name === nodeB.driver_name)
        expect(ascNodes[2].driver_name === nodeC.driver_name)

        const descNodes = await LapTime.findAll({sortByProperty: 'driver_name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].driver_name === nodeC.driver_name)
        expect(descNodes[1].driver_name === nodeB.driver_name)
        expect(descNodes[2].driver_name === nodeA.driver_name)
    })
})
