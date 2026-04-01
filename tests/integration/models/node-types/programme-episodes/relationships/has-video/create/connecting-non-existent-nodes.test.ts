import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-video‹ relationship with nodes that do not exist', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const video = await seedNode(DbNodeType.Video)

    await expect(ProgrammeEpisode.createHasVideoRelationship(-42, video.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ProgrammeEpisode.createHasVideoRelationship(programmeEpisode.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ProgrammeEpisode.createHasVideoRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
