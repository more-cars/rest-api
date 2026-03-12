import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›covered-by-programme-episode‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

    await expect(CarModel.createCoveredByProgrammeEpisodeRelationship(-42, programmeEpisode.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createCoveredByProgrammeEpisodeRelationship(carModel.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createCoveredByProgrammeEpisodeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
