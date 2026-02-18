import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A IMAGE can have multiple ›belongs-to-node‹ relationships', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const brandsAmount = 3
    const brands = await seedNodes(NodeTypeEnum.BRAND, brandsAmount)

    for (const brand of brands) {
        await Image.createBelongsToNodeRelationship(image.id, brand.id)
    }

    const relationships = await getRelationshipCollection(
        image.id,
        RelationshipType.ImageBelongsToNode,
    )

    expect(relationships.length)
        .toBe(brandsAmount)
})
