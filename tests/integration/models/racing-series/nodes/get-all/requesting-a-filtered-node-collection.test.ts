import {describe, expect, test} from 'vitest'
import {deleteAllRacingSeries} from "../../../../../_toolbox/dbSeeding/racing-series/nodes/deleteAllRacingSeries"
import type {RacingSeriesNode} from "../../../../../../src/models/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../src/models/racing-series/RacingSeries"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedRacingSeries} from "../../../../../_toolbox/dbSeeding/racing-series/nodes/seedRacingSeries"

describe('A filtered "get all RACING SERIES nodes" request returns only the matching nodes', () => {
    test('when there exist NO Racing Series nodes', async () => {
        await deleteAllRacingSeries()

        const expectedNodes: Array<RacingSeriesNode> = []
        const actualNodes = await RacingSeries.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist Racing Series nodes', async () => {
        await deleteAllRacingSeries()
        const nodeA = await seedRacingSeries({name: 'A Node'})
        await seedRacingSeries({name: 'B Node'})
        await seedRacingSeries({name: 'C Node'})

        const filteredNodes = await RacingSeries.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
