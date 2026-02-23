import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RacingEventNode} from "../../../../../../src/db/node-types/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A filtered "get all RACING EVENT nodes" request returns only the matching nodes', () => {
    test('when there exist no RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingEvent)

        const expectedNodes: RacingEventNode[] = []
        const actualNodes = await RacingEvent.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingEvent)
        const nodeA = await seedNode(DbNodeType.RacingEvent, {
            name: 'A Node'
        }) as unknown as RacingEventNode
        await seedNode(DbNodeType.RacingEvent, {name: 'B Node'})
        await seedNode(DbNodeType.RacingEvent, {name: 'C Node'})

        const filteredNodes = await RacingEvent.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
