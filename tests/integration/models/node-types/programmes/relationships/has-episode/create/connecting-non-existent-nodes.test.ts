import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-episode‹ relationship with nodes that do not exist', async () => {
    const programme = await seedNode(DbNodeType.Programme)
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

    await expect(Programme.createHasEpisodeRelationship(-42, programmeEpisode.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Programme.createHasEpisodeRelationship(programme.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Programme.createHasEpisodeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
