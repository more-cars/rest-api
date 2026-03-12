import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A PROGRAMME EPISODE cannot have multiple ›is-followed-by-episode‹ relationships', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const partnersAmount = 3
    const partners = await seedNodes(DbNodeType.ProgrammeEpisode, partnersAmount)

    for (const partner of partners) {
        await ProgrammeEpisode.createIsFollowedByEpisodeRelationship(programmeEpisode.properties.id, partner.properties.id)
    }

    const relationships = await getRelationshipCollection(programmeEpisode.properties.id, RelationshipType.ProgrammeEpisodeIsFollowedByEpisode)

    expect(relationships.length)
        .toBe(1)
})
