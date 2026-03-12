import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-followed-by-episode‹ relationship again', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const partner = await seedNode(DbNodeType.ProgrammeEpisode)

    await expect(ProgrammeEpisode.createIsFollowedByEpisodeRelationship(programmeEpisode.properties.id, partner.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(ProgrammeEpisode.createIsFollowedByEpisodeRelationship(programmeEpisode.properties.id, partner.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
