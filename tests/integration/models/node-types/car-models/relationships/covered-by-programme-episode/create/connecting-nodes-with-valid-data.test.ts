import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›covered-by-programme-episode‹ relationship with valid data', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

    const createdRelationship = await CarModel.createCoveredByProgrammeEpisodeRelationship(carModel.properties.id, programmeEpisode.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(carModel.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(programmeEpisode.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelCoveredByProgrammeEpisode)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
