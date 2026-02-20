import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A BRAND cannot have multiple ›has-prime-image‹ relationships', async () => {
    const brand = await seedNode(ControllerNodeType.BRAND)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.IMAGE, imagesAmount)

    for (const image of images) {
        await Brand.createHasPrimeImageRelationship(brand.id, image.id)
    }

    const relationships = await getRelationshipCollection(brand.id, RelationshipType.BrandHasPrimeImage, NodeTypeLabel.Image)

    expect(relationships.length)
        .toBe(1)
})
