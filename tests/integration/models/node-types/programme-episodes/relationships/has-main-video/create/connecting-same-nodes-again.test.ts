import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-main-video‹ relationship again', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const video = await seedNode(DbNodeType.Video)

    await expect(ProgrammeEpisode.createHasMainVideoRelationship(programmeEpisode.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(ProgrammeEpisode.createHasMainVideoRelationship(programmeEpisode.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
