import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›featured-in-programme-episode‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)

    const createdRelationship = await CarModelVariant.createFeaturedInProgrammeEpisodeRelationship(carModelVariant.properties.id, programmeEpisode.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(programmeEpisode.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelVariantFeaturedInProgrammeEpisode)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
