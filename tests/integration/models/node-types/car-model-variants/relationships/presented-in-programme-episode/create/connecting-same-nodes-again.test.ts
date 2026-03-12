import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›presented-in-programme-episode‹ relationship again', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

    await expect(CarModelVariant.createPresentedInProgrammeEpisodeRelationship(carModelVariant.properties.id, programmeEpisode.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createPresentedInProgrammeEpisodeRelationship(carModelVariant.properties.id, programmeEpisode.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
