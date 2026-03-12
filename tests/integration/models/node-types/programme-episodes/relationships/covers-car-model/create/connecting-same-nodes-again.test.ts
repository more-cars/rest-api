import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›covers-car-model‹ relationship again', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const carModel = await seedNode(DbNodeType.CarModel)

    await expect(ProgrammeEpisode.createCoversCarModelRelationship(programmeEpisode.properties.id, carModel.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(ProgrammeEpisode.createCoversCarModelRelationship(programmeEpisode.properties.id, carModel.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
