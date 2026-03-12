import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-episode‹ relationship with valid data', async () => {
    const programme = await seedNode(DbNodeType.Programme)
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

    const createdRelationship = await Programme.createHasEpisodeRelationship(programme.properties.id, programmeEpisode.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(programme.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(programmeEpisode.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.ProgrammeHasEpisode)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
