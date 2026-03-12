import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL VARIANT can have multiple ›presented-in-programme-episode‹ relationships', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const programmeEpisodesAmount = 3
    const programmeEpisodes = await seedNodes(DbNodeType.ProgrammeEpisode, programmeEpisodesAmount)

    for (const programmeEpisode of programmeEpisodes) {
        await CarModelVariant.createPresentedInProgrammeEpisodeRelationship(carModelVariant.properties.id, programmeEpisode.properties.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.properties.id, RelationshipType.CarModelVariantPresentedInProgrammeEpisode)

    expect(relationships.length)
        .toBe(programmeEpisodesAmount)
})
