import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Price} from "../../../../../../../../src/models/node-types/prices/Price"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A PRICE can have multiple ›has-image‹ relationships', async () => {
    const price = await seedNode(DbNodeType.Price)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await Price.createHasImageRelationship(price.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(price.properties.id, RelationshipType.PriceHasImage)

    expect(relationships.length)
        .toBe(imagesAmount)
})
