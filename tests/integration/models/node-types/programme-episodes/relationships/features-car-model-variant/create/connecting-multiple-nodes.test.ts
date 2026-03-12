import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A PROGRAMME EPISODE can have multiple ›features-car-model-variant‹ relationships', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(DbNodeType.CarModelVariant, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await ProgrammeEpisode.createFeaturesCarModelVariantRelationship(programmeEpisode.properties.id, carModelVariant.properties.id)
    }

    const relationships = await getRelationshipCollection(programmeEpisode.properties.id, RelationshipType.ProgrammeEpisodeFeaturesCarModelVariant)

    expect(relationships.length)
        .toBe(carModelVariantsAmount)
})
