import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-programme‹ relationship with valid data', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const programme = await seedNode(DbNodeType.Programme)

    const createdRelationship = await ProgrammeEpisode.createBelongsToProgrammeRelationship(programmeEpisode.properties.id, programme.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(programmeEpisode.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(programme.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.ProgrammeEpisodeBelongsToProgramme)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
