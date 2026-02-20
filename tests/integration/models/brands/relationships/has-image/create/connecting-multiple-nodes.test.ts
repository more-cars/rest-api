import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A BRAND can have multiple ›has-image‹ relationships', async () => {
    const brand = await seedNode(ControllerNodeType.BRAND)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.IMAGE, imagesAmount)

    for (const image of images) {
        await Brand.createHasImageRelationship(brand.id, image.id)
    }

    const relationships = await getRelationshipCollection(brand.id, RelationshipType.BrandHasImage, DbNodeType.Image)

    expect(relationships.length)
        .toBe(imagesAmount)
})
