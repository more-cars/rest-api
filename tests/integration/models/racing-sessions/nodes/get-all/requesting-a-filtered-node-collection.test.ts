import {describe, expect, test} from 'vitest'
import {deleteAllRacingSessions} from "../../../../../_toolbox/dbSeeding/racing-sessions/nodes/deleteAllRacingSessions"
import type {RacingSessionNode} from "../../../../../../src/models/racing-sessions/types/RacingSessionNode"
import {RacingSession} from "../../../../../../src/models/racing-sessions/RacingSession"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedRacingSession} from "../../../../../_toolbox/dbSeeding/racing-sessions/nodes/seedRacingSession"

describe('A filtered "get all RACING SESSION nodes" request returns only the matching nodes', () => {
    test('when there exist NO Racing Session nodes', async () => {
        await deleteAllRacingSessions()

        const expectedNodes: Array<RacingSessionNode> = []
        const actualNodes = await RacingSession.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist Racing Session nodes', async () => {
        await deleteAllRacingSessions()
        const nodeA = await seedRacingSession({name: 'A Node'})
        await seedRacingSession({name: 'B Node'})
        await seedRacingSession({name: 'C Node'})

        const filteredNodes = await RacingSession.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
