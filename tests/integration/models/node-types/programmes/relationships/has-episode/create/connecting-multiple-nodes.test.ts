import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Programme} from "../../../../../../../../src/models/node-types/programmes/Programme"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A PROGRAMME can have multiple ›has-episode‹ relationships', async () => {
    const programme = await seedNode(DbNodeType.Programme)
    const programmeEpisodesAmount = 3
    const programmeEpisodes = await seedNodes(DbNodeType.ProgrammeEpisode, programmeEpisodesAmount)

    for (const programmeEpisode of programmeEpisodes) {
        await Programme.createHasEpisodeRelationship(programme.properties.id, programmeEpisode.properties.id)
    }

    const relationships = await getRelationshipCollection(programme.properties.id, RelationshipType.ProgrammeHasEpisode)

    expect(relationships.length)
        .toBe(programmeEpisodesAmount)
})
