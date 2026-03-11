import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ProgrammeEpisodeNode} from "../../../../../../../src/models/node-types/programme-episodes/types/ProgrammeEpisodeNode"
import {ProgrammeEpisode} from "../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all PROGRAMME EPISODE nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no PROGRAMME EPISODE nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.ProgrammeEpisode)

        const expectedNodes: ProgrammeEpisodeNode[] = []
        const actualNodes = await ProgrammeEpisode.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 PROGRAMME EPISODE nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.ProgrammeEpisode)
        await seedNodes(DbNodeType.ProgrammeEpisode, totalNodeAmount)

        const actualNodes = await ProgrammeEpisode.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
