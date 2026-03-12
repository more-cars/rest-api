import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›covered-by-programme-episode‹ relationship again', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

    await expect(CarModel.createCoveredByProgrammeEpisodeRelationship(carModel.properties.id, programmeEpisode.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModel.createCoveredByProgrammeEpisodeRelationship(carModel.properties.id, programmeEpisode.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
