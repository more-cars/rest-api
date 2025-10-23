import {describe, expect, test} from 'vitest'
import {deleteAllRacingSeries} from "../../../../../_toolbox/dbSeeding/racing-series/nodes/deleteAllRacingSeries"
import type {RacingSeriesNode} from "../../../../../../src/models/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../src/models/racing-series/RacingSeries"
import {seedRacingSeriess} from "../../../../../_toolbox/dbSeeding/racing-series/nodes/seedRacingSeriess"

describe('A non-parametrized "get all RACING SERIES nodes" request returns the correct number of nodes', () => {
    test('when there exist NO racing series nodes', async () => {
        await deleteAllRacingSeries()

        const expectedNodes: Array<RacingSeriesNode> = []
        const actualNodes = await RacingSeries.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist racing series nodes', async () => {
        await deleteAllRacingSeries()
        const amount = Math.ceil(Math.random() * 20)
        await seedRacingSeriess(amount)

        const actualNodes = await RacingSeries.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
