import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›presented-in-programme-episode‹ relationship with nodes that do not exist', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

    await expect(CarModelVariant.createPresentedInProgrammeEpisodeRelationship(-42, programmeEpisode.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createPresentedInProgrammeEpisodeRelationship(carModelVariant.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createPresentedInProgrammeEpisodeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
