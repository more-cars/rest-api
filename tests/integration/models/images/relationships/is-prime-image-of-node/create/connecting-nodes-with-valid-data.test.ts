import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"
import {ImageRelationship} from "../../../../../../../src/models/images/types/ImageRelationship"

test('Creating a ›is-prime-image-of-node‹ relationship with valid data', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const node = await seedNode(NodeTypeEnum.COMPANY)

    const createdRelationship = await Image.createIsPrimeImageOfNodeRelationship(image.id, node.id)

    expect(createdRelationship.origin.id)
        .toEqual(image.id)
    expect(createdRelationship.destination.id)
        .toEqual(node.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(ImageRelationship.isPrimeImageOfNode)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
