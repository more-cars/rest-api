import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-episode‹ relationship again', async () => {
    const programme = await seedNode(DbNodeType.Programme)
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

    await expect(Programme.createHasEpisodeRelationship(programme.properties.id, programmeEpisode.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Programme.createHasEpisodeRelationship(programme.properties.id, programmeEpisode.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
