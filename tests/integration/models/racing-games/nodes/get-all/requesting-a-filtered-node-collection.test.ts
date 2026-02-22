import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RacingGameNode} from "../../../../../../src/db/nodes/racing-games/types/RacingGameNode"
import {RacingGame} from "../../../../../../src/models/node-types/racing-games/RacingGame"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A filtered "get all RACING GAME nodes" request returns only the matching nodes', () => {
    test('when there exist no RACING GAME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingGame)

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
        await deleteAllNodesOfType(DbNodeType.RacingGame)
        const nodeA = await seedNode(DbNodeType.RacingGame, {
            name: 'A Node'
        }) as unknown as RacingGameNode
        await seedNode(DbNodeType.RacingGame, {name: 'B Node'})
        await seedNode(DbNodeType.RacingGame, {name: 'C Node'})

        const filteredNodes = await RacingGame.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
