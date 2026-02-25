import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RacingGameNode} from "../../../../../../../src/db/node-types/racing-games/types/RacingGameNode"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A sorted "get all RACING GAME nodes" request returns the nodes in correct order', () => {
    test('when there exist no RACING GAME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingGame)

        const expectedNodes: RacingGameNode[] = []
        const actualNodes = await RacingGame.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING GAME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingGame)
        const nodeA = await seedNode(DbNodeType.RacingGame, {name: 'A Node'}) as RacingGameNode
        const nodeB = await seedNode(DbNodeType.RacingGame, {name: 'B Node'}) as RacingGameNode
        const nodeC = await seedNode(DbNodeType.RacingGame, {name: 'C Node'}) as RacingGameNode

        const ascNodes = await RacingGame.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await RacingGame.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
