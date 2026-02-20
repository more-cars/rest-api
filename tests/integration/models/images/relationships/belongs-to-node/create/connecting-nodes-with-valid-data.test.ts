import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-node‹ relationship with valid data', async () => {
    const image = await seedNode(ControllerNodeType.IMAGE)
    const brand = await seedNode(ControllerNodeType.BRAND)

    const createdRelationship = await Image.createBelongsToNodeRelationship(image.properties.id, brand.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(brand.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.ImageBelongsToNode)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
