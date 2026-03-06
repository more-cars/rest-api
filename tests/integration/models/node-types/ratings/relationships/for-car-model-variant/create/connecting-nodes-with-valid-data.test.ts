import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›for-car-model-variant‹ relationship with valid data', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    const createdRelationship = await Rating.createForCarModelVariantRelationship(rating.properties.id, carModelVariant.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(rating.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RatingForCarModelVariant)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
