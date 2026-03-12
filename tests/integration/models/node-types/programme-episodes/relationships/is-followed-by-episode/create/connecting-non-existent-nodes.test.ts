import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-followed-by-episode‹ relationship with nodes that do not exist', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const partner = await seedNode(DbNodeType.ProgrammeEpisode)

    await expect(ProgrammeEpisode.createIsFollowedByEpisodeRelationship(-42, partner.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ProgrammeEpisode.createIsFollowedByEpisodeRelationship(programmeEpisode.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ProgrammeEpisode.createIsFollowedByEpisodeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
