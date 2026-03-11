import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisodeNode} from "../../../../../../src/db/node-types/programme-episodes/types/ProgrammeEpisodeNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../../src/db/node-types/programme-episodes/getAllNodesOfType"

test('When there are no PROGRAMME EPISODES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.ProgrammeEpisode)

    const expectedProgrammeEpisodes: ProgrammeEpisodeNode[] = []
    const actualProgrammeEpisodes = await getAllNodesOfType()

    expect(actualProgrammeEpisodes)
        .toEqual(expectedProgrammeEpisodes)
})

test('When PROGRAMME EPISODES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.ProgrammeEpisode)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.ProgrammeEpisode, amount)

    const actualProgrammeEpisodes = await getAllNodesOfType()

    expect(actualProgrammeEpisodes.length)
        .toEqual(amount)
})
