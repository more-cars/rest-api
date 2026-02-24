import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RacingSeriesNode} from "../../../../../../src/db/node-types/racing-series/types/RacingSeriesNode"
import {RacingSeries} from "../../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A sorted "get all RACING SERIES nodes" request returns the nodes in correct order', () => {
    test('when there exist no RACING SERIES nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingSeries)

        const expectedNodes: RacingSeriesNode[] = []
        const actualNodes = await RacingSeries.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist racing series nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingSeries)
        const nodeA = await seedNode(DbNodeType.RacingSeries, {name: 'A Node'}) as RacingSeriesNode
        const nodeB = await seedNode(DbNodeType.RacingSeries, {name: 'B Node'}) as RacingSeriesNode
        const nodeC = await seedNode(DbNodeType.RacingSeries, {name: 'C Node'}) as RacingSeriesNode

        const ascNodes = await RacingSeries.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await RacingSeries.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
