import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›covers-car-model‹ relationship with nodes that do not exist', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const carModel = await seedNode(DbNodeType.CarModel)

    await expect(ProgrammeEpisode.createCoversCarModelRelationship(-42, carModel.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ProgrammeEpisode.createCoversCarModelRelationship(programmeEpisode.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ProgrammeEpisode.createCoversCarModelRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
