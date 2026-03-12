import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›covers-car-model‹ relationship with valid data', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const carModel = await seedNode(DbNodeType.CarModel)

    const createdRelationship = await ProgrammeEpisode.createCoversCarModelRelationship(programmeEpisode.properties.id, carModel.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(programmeEpisode.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(carModel.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.ProgrammeEpisodeCoversCarModel)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
