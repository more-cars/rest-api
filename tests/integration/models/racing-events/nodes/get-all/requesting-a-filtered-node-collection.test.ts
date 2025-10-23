import {describe, expect, test} from 'vitest'
import {deleteAllRacingEvents} from "../../../../../_toolbox/dbSeeding/racing-events/nodes/deleteAllRacingEvents"
import type {RacingEventNode} from "../../../../../../src/models/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/racing-events/RacingEvent"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedRacingEvent} from "../../../../../_toolbox/dbSeeding/racing-events/nodes/seedRacingEvent"

describe('A filtered "get all RACING EVENT nodes" request returns only the matching nodes', () => {
    test('when there exist NO Racing Event nodes', async () => {
        await deleteAllRacingEvents()

        const expectedNodes: Array<RacingEventNode> = []
        const actualNodes = await RacingEvent.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist Racing Event nodes', async () => {
        await deleteAllRacingEvents()
        const nodeA = await seedRacingEvent({name: 'A Node'})
        await seedRacingEvent({name: 'B Node'})
        await seedRacingEvent({name: 'C Node'})

        const filteredNodes = await RacingEvent.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
