import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await Brand.createHasImageRelationship(brand.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(brand.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.BrandHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
