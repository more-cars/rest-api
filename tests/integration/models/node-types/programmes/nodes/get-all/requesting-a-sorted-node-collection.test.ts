import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ProgrammeNode} from "../../../../../../../src/db/node-types/programmes/types/ProgrammeNode"
import {Programme} from "../../../../../../../src/models/node-types/programmes/Programme"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all PROGRAMME nodes" request returns the nodes in correct order', () => {
    test('when there exist no PROGRAMME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Programme)

        const expectedNodes: ProgrammeNode[] = []
        const actualNodes = await Programme.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist PROGRAMME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Programme)
        const nodeA = await seedNode(DbNodeType.Programme, {name: 'A Node'}) as ProgrammeNode
        const nodeB = await seedNode(DbNodeType.Programme, {name: 'B Node'}) as ProgrammeNode
        const nodeC = await seedNode(DbNodeType.Programme, {name: 'C Node'}) as ProgrammeNode

        const ascNodes = await Programme.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await Programme.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
