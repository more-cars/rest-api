import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A BRAND cannot have multiple ›has-prime-image‹ relationships', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await Brand.createHasPrimeImageRelationship(brand.id, image.id)
    }

    const relationships = await getRelationshipCollection(brand.id, DbRelationship.BrandHasPrimeImage, NodeTypeLabel.Image, RelationshipDirection.FORWARD)

    expect(relationships.length)
        .toBe(1)
})
