import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A IMAGE can have multiple ›belongs-to-node‹ relationships', async () => {
    const image = await seedNode(DbNodeType.Image)
    const brandsAmount = 3
    const brands = await seedNodes(DbNodeType.Brand, brandsAmount)

    for (const brand of brands) {
        await Image.createBelongsToNodeRelationship(image.properties.id, brand.properties.id)
    }

    const relationships = await getRelationshipCollection(
        image.properties.id,
        RelationshipType.ImageBelongsToNode,
    )

    expect(relationships.length)
        .toBe(brandsAmount)
})
