import {expect, test} from 'vitest'
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A BRAND cannot have multiple ›has-prime-image‹ relationships', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await Brand.createHasPrimeImageRelationship(brand.id, image.id)
    }

    const relationships = await getRelationshipCollection(brand.id, DbRelationship.BrandHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
