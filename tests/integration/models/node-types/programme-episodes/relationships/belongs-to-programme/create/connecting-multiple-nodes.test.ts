import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A PROGRAMME EPISODE cannot have multiple ›belongs-to-programme‹ relationships', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const programmesAmount = 3
    const programmes = await seedNodes(DbNodeType.Programme, programmesAmount)

    for (const programme of programmes) {
        await ProgrammeEpisode.createBelongsToProgrammeRelationship(programmeEpisode.properties.id, programme.properties.id)
    }

    const relationships = await getRelationshipCollection(programmeEpisode.properties.id, RelationshipType.ProgrammeEpisodeBelongsToProgramme)

    expect(relationships.length)
        .toBe(1)
})
