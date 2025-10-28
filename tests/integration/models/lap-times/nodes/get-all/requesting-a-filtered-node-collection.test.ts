import {describe, expect, test} from 'vitest'
import {deleteAllLapTimes} from "../../../../../_toolbox/dbSeeding/lap-times/nodes/deleteAllLapTimes"
import type {LapTimeNode} from "../../../../../../src/models/lap-times/types/LapTimeNode"
import {LapTime} from "../../../../../../src/models/lap-times/LapTime"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedLapTime} from "../../../../../_toolbox/dbSeeding/lap-times/nodes/seedLapTime"

describe('A filtered "get all LAP TIME nodes" request returns only the matching nodes', () => {
    test('when there exist NO Lap Time nodes', async () => {
        await deleteAllLapTimes()

        const expectedNodes: Array<LapTimeNode> = []
        const actualNodes = await LapTime.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist Lap Time nodes', async () => {
        await deleteAllLapTimes()
        const nodeA = await seedLapTime({driver_name: 'A Node'})
        await seedLapTime({driver_name: 'B Node'})
        await seedLapTime({driver_name: 'C Node'})

        const filteredNodes = await LapTime.findAll({
            filterByProperty: 'driver_name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].driver_name === nodeA.driver_name)
    })
})
