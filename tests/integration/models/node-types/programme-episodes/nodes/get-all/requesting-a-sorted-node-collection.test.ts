import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ProgrammeEpisodeNode} from "../../../../../../../src/db/node-types/programme-episodes/types/ProgrammeEpisodeNode"
import {ProgrammeEpisode} from "../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all PROGRAMME EPISODE nodes" request returns the nodes in correct order', () => {
    test('when there exist no PROGRAMME EPISODE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ProgrammeEpisode)

        const expectedNodes: ProgrammeEpisodeNode[] = []
        const actualNodes = await ProgrammeEpisode.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist PROGRAMME EPISODE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ProgrammeEpisode)
        const nodeA = await seedNode(DbNodeType.ProgrammeEpisode, {name: 'A Node'}) as ProgrammeEpisodeNode
        const nodeB = await seedNode(DbNodeType.ProgrammeEpisode, {name: 'B Node'}) as ProgrammeEpisodeNode
        const nodeC = await seedNode(DbNodeType.ProgrammeEpisode, {name: 'C Node'}) as ProgrammeEpisodeNode

        const ascNodes = await ProgrammeEpisode.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await ProgrammeEpisode.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
