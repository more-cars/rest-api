import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RacingGameNode} from "../../../../../../src/models/node-types/racing-games/types/RacingGameNode"
import {RacingGame} from "../../../../../../src/models/node-types/racing-games/RacingGame"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all RACING GAME nodes" request returns only the matching nodes', () => {
    test('when there exist no RACING GAME nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_GAME)

        const expectedNodes: RacingGameNode[] = []
        const actualNodes = await RacingGame.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING GAME nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_GAME)
        const nodeA = await seedNode(ControllerNodeType.RACING_GAME, {
            name: 'A Node'
        }) as unknown as RacingGameNode
        await seedNode(ControllerNodeType.RACING_GAME, {name: 'B Node'})
        await seedNode(ControllerNodeType.RACING_GAME, {name: 'C Node'})

        const filteredNodes = await RacingGame.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
