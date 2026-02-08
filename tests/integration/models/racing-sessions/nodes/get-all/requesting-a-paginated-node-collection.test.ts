import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingSessionNode} from "../../../../../../src/models/racing-sessions/types/RacingSessionNode"
import {RacingSession} from "../../../../../../src/models/racing-sessions/RacingSession"
import {seedRacingSession} from "../../../../../_toolbox/dbSeeding/racing-sessions/nodes/seedRacingSession"

describe('A sorted "get all RACING SESSION nodes" request returns the nodes in correct order', () => {
    test('when there exist NO racing session nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SESSION)

        const expectedNodes: Array<RacingSessionNode> = []
        const actualNodes = await RacingSession.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist racing session nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_SESSION)
        const nodeA = await seedRacingSession({name: 'A Node'})
        const nodeB = await seedRacingSession({name: 'B Node'})
        const nodeC = await seedRacingSession({name: 'C Node'})

        const ascNodes = await RacingSession.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await RacingSession.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
