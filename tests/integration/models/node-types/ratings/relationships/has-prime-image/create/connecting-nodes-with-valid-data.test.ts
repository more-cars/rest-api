import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const image = await seedNode(DbNodeType.Image)

    const createdRelationship = await Rating.createHasPrimeImageRelationship(rating.properties.id, image.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(rating.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RatingHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
