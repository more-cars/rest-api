import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-node‹ relationship with valid data', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const brand = await seedNode(NodeTypeEnum.BRAND)

    const createdRelationship = await Image.createBelongsToNodeRelationship(image.id, brand.id)

    expect(createdRelationship.origin.id)
        .toEqual(image.id)
    expect(createdRelationship.destination.id)
        .toEqual(brand.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.ImageBelongsToNode)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
