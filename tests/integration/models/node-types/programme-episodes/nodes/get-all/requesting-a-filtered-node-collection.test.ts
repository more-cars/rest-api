import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ProgrammeEpisodeNode} from "../../../../../../../src/db/node-types/programme-episodes/types/ProgrammeEpisodeNode"
import {ProgrammeEpisode} from "../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all PROGRAMME EPISODE nodes" request returns only the matching nodes', () => {
    test('when there exist no PROGRAMME EPISODE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ProgrammeEpisode)

        const expectedNodes: ProgrammeEpisodeNode[] = []
        const actualNodes = await ProgrammeEpisode.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist PROGRAMME EPISODE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ProgrammeEpisode)
        const nodeA = await seedNode(DbNodeType.ProgrammeEpisode, {name: 'A Node'}) as ProgrammeEpisodeNode
        await seedNode(DbNodeType.ProgrammeEpisode, {name: 'B Node'})
        await seedNode(DbNodeType.ProgrammeEpisode, {name: 'C Node'})

        const filteredNodes = await ProgrammeEpisode.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
