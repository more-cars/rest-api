import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/programme-episodes/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisodeSchema} from "../../../../../_toolbox/schemas/db/ProgrammeEpisodeSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a PROGRAMME EPISODE that does not exist should return "false"', async () => {
    const expectedProgrammeEpisodeNode = false
    const actualProgrammeEpisodeNode = await getNodeById(-42)

    expect(actualProgrammeEpisodeNode)
        .toBe(expectedProgrammeEpisodeNode)
})

test('Querying an existing PROGRAMME EPISODE should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.ProgrammeEpisode)
    const programmeEpisodeNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(programmeEpisodeNode, ProgrammeEpisodeSchema))
        .toBeTruthy()
})
