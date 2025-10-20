import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Image} from "../../../../../../../src/models/images/Image"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Both nodes exist, but have no relationship', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const partnerNode = await seedNode(NodeTypeEnum.COMPANY)

    await expect(Image.deleteBelongsToNodeRelationship(image.id, partnerNode.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
