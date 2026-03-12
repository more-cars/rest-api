import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-programme‹ relationship again', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const programme = await seedNode(DbNodeType.Programme)

    await expect(ProgrammeEpisode.createBelongsToProgrammeRelationship(programmeEpisode.properties.id, programme.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(ProgrammeEpisode.createBelongsToProgrammeRelationship(programmeEpisode.properties.id, programme.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
