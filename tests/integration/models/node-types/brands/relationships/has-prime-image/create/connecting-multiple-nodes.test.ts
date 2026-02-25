import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Brand} from "../../../../../../../../src/models/node-types/brands/Brand"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A BRAND cannot have multiple ›has-prime-image‹ relationships', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await Brand.createHasPrimeImageRelationship(brand.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(brand.properties.id, RelationshipType.BrandHasPrimeImage, DbNodeType.Image)

    expect(relationships.length)
        .toBe(1)
})
