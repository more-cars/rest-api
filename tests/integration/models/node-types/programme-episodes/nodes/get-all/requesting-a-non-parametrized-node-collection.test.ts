import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ProgrammeEpisodeNode} from "../../../../../../../src/models/node-types/programme-episodes/types/ProgrammeEpisodeNode"
import {ProgrammeEpisode} from "../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all PROGRAMME EPISODE nodes" request returns the correct number of nodes', () => {
    test('when there exist no PROGRAMME EPISODE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ProgrammeEpisode)

        const expectedNodes: ProgrammeEpisodeNode[] = []
        const actualNodes = await ProgrammeEpisode.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist PROGRAMME EPISODE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ProgrammeEpisode)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.ProgrammeEpisode, amount)

        const actualNodes = await ProgrammeEpisode.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
