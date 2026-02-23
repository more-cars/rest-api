import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RacingSessionNode} from "../../../../../../src/db/node-types/racing-sessions/types/RacingSessionNode"
import {RacingSession} from "../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A sorted "get all RACING SESSION nodes" request returns the nodes in correct order', () => {
    test('when there exist no RACING SESSION nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingSession)

        const expectedNodes: RacingSessionNode[] = []
        const actualNodes = await RacingSession.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING SESSION nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingSession)
        const nodeA = await seedNode(DbNodeType.RacingSession, {
            name: 'A Node'
        }) as unknown as RacingSessionNode
        const nodeB = await seedNode(DbNodeType.RacingSession, {
            name: 'B Node'
        }) as unknown as RacingSessionNode
        const nodeC = await seedNode(DbNodeType.RacingSession, {
            name: 'C Node'
        }) as unknown as RacingSessionNode

        const ascNodes = await RacingSession.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await RacingSession.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
