import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RacingGameNode} from "../../../../../../src/models/racing-games/types/RacingGameNode"
import {RacingGame} from "../../../../../../src/models/racing-games/RacingGame"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all RACING GAME nodes" request returns the nodes in correct order', () => {
    test('when there exist no RACING GAME nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_GAME)

        const expectedNodes: RacingGameNode[] = []
        const actualNodes = await RacingGame.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING GAME nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACING_GAME)
        const nodeA = await seedNode(NodeTypeEnum.RACING_GAME, {name: 'A Node'}) as RacingGameNode
        const nodeB = await seedNode(NodeTypeEnum.RACING_GAME, {name: 'B Node'}) as RacingGameNode
        const nodeC = await seedNode(NodeTypeEnum.RACING_GAME, {name: 'C Node'}) as RacingGameNode

        const ascNodes = await RacingGame.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await RacingGame.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
