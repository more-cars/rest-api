import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RacingEventNode} from "../../../../../../src/db/node-types/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A sorted "get all RACING EVENT nodes" request returns the nodes in correct order', () => {
    test('when there exist no RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingEvent)

        const expectedNodes: RacingEventNode[] = []
        const actualNodes = await RacingEvent.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingEvent)
        const nodeA = await seedNode(DbNodeType.RacingEvent, {name: 'A Node'}) as RacingEventNode
        const nodeB = await seedNode(DbNodeType.RacingEvent, {name: 'B Node'}) as RacingEventNode
        const nodeC = await seedNode(DbNodeType.RacingEvent, {name: 'C Node'}) as RacingEventNode

        const ascNodes = await RacingEvent.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await RacingEvent.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
