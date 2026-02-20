import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const brand = await seedNode(ControllerNodeType.BRAND)
    const image = await seedNode(ControllerNodeType.IMAGE)

    const createdRelationship = await Brand.createHasImageRelationship(brand.properties.id, image.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(brand.properties.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.BrandHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
