import {describe, expect, test} from 'vitest'
import {deleteAllRacingSeries} from "../../../../../_toolbox/dbSeeding/racing-series/nodes/deleteAllRacingSeries"
import type {RacingSeriesNode} from "../../../../../../src/models/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../src/models/racing-series/RacingSeries"
import {seedRacingSeries} from "../../../../../_toolbox/dbSeeding/racing-series/nodes/seedRacingSeries"

describe('A sorted "get all RACING SERIES nodes" request returns the nodes in correct order', () => {
    test('when there exist NO racing series nodes', async () => {
        await deleteAllRacingSeries()

        const expectedNodes: Array<RacingSeriesNode> = []
        const actualNodes = await RacingSeries.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist racing series nodes', async () => {
        await deleteAllRacingSeries()
        const nodeA = await seedRacingSeries({name: 'A Node'})
        const nodeB = await seedRacingSeries({name: 'B Node'})
        const nodeC = await seedRacingSeries({name: 'C Node'})

        const ascNodes = await RacingSeries.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await RacingSeries.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
