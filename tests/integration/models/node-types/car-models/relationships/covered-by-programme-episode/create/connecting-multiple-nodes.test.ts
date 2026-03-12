import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL can have multiple ›covered-by-programme-episode‹ relationships', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const programmeEpisodesAmount = 3
    const programmeEpisodes = await seedNodes(DbNodeType.ProgrammeEpisode, programmeEpisodesAmount)

    for (const programmeEpisode of programmeEpisodes) {
        await CarModel.createCoveredByProgrammeEpisodeRelationship(carModel.properties.id, programmeEpisode.properties.id)
    }

    const relationships = await getRelationshipCollection(carModel.properties.id, RelationshipType.CarModelCoveredByProgrammeEpisode)

    expect(relationships.length)
        .toBe(programmeEpisodesAmount)
})
