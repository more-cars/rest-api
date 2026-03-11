import {describe, expect, test} from 'vitest'
import {ProgrammeEpisode} from "../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a PROGRAMME EPISODE', () => {
    test('which does not exist', async () => {
        await expect(ProgrammeEpisode.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedProgrammeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
        const actualProgrammeEpisode = await ProgrammeEpisode.findById(expectedProgrammeEpisode.properties.id)

        expect(actualProgrammeEpisode.attributes)
            .toEqual(expectedProgrammeEpisode.properties)
    })
})
