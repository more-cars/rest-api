import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ProgrammeNode} from "../../../../../../../src/db/node-types/programmes/types/ProgrammeNode"
import {Programme} from "../../../../../../../src/models/node-types/programmes/Programme"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all PROGRAMME nodes" request returns only the matching nodes', () => {
    test('when there exist no PROGRAMME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Programme)

        const expectedNodes: ProgrammeNode[] = []
        const actualNodes = await Programme.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist PROGRAMME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Programme)
        const nodeA = await seedNode(DbNodeType.Programme, {name: 'A Node'}) as ProgrammeNode
        await seedNode(DbNodeType.Programme, {name: 'B Node'})
        await seedNode(DbNodeType.Programme, {name: 'C Node'})

        const filteredNodes = await Programme.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
