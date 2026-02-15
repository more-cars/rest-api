import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"
import {ImageRelationship} from "../../../../../../../src/models/images/types/ImageRelationship"

test('Creating a ›belongs-to-node‹ relationship with valid data', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const partnerNode = await seedNode(NodeTypeEnum.CAR_MODEL)

    const createdRelationship = await Image.createBelongsToNodeRelationship(image.id, partnerNode.id)

    expect(createdRelationship.origin.id)
        .toEqual(image.id)
    expect(createdRelationship.destination.id)
        .toEqual(partnerNode.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(ImageRelationship.belongsToNode)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
