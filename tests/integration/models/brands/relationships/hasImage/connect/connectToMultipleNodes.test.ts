import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

test('A BRAND can have multiple ›has-image‹ relationships', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await Brand.createHasImageRelationship(brand.id, image.id)
    }

    const relationships = await Brand.getAllHasImageRelationships(brand.id)

    expect(relationships.length)
        .toBe(imagesAmount)
})
