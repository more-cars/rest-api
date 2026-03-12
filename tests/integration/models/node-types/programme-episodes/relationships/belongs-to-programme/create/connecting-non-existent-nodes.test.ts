import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-programme‹ relationship with nodes that do not exist', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const programme = await seedNode(DbNodeType.Programme)

    await expect(ProgrammeEpisode.createBelongsToProgrammeRelationship(-42, programme.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ProgrammeEpisode.createBelongsToProgrammeRelationship(programmeEpisode.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ProgrammeEpisode.createBelongsToProgrammeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
