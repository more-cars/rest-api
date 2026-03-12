import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›features-car-model-variant‹ relationship again', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(ProgrammeEpisode.createFeaturesCarModelVariantRelationship(programmeEpisode.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(ProgrammeEpisode.createFeaturesCarModelVariantRelationship(programmeEpisode.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
