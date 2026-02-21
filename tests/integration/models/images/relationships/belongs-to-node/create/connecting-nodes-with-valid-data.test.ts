import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-node‹ relationship with valid data', async () => {
    const image = await seedNode(ControllerNodeType.Image)
    const brand = await seedNode(ControllerNodeType.Brand)

    const createdRelationship = await Image.createBelongsToNodeRelationship(image.properties.id, brand.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.destination.attributes.id)
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
