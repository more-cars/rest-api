import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RATING cannot have multiple ›has-prime-image‹ relationships', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await Rating.createHasPrimeImageRelationship(rating.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(rating.properties.id, RelationshipType.RatingHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
