import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A BRAND can have multiple ›has-image‹ relationships', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await Brand.createHasImageRelationship(brand.id, image.id)
    }

    const relationships = await getRelationshipCollection(brand.id, DbRelationship.BrandHasImage, NodeTypeLabel.Image, RelationshipDirection.FORWARD)

    expect(relationships.length)
        .toBe(imagesAmount)
})
