import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RacingGameNode} from "../../../../../../src/db/nodes/racing-games/types/RacingGameNode"
import {RacingGame} from "../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all RACING GAME nodes" request returns the nodes in correct order', () => {
    test('when there exist no RACING GAME nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RacingGame)

        const expectedNodes: RacingGameNode[] = []
        const actualNodes = await RacingGame.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING GAME nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RacingGame)
        const nodeA = await seedNode(ControllerNodeType.RacingGame, {
            name: 'A Node'
        }) as unknown as RacingGameNode
        const nodeB = await seedNode(ControllerNodeType.RacingGame, {
            name: 'B Node'
        }) as unknown as RacingGameNode
        const nodeC = await seedNode(ControllerNodeType.RacingGame, {
            name: 'C Node'
        }) as unknown as RacingGameNode

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
