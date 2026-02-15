import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Image} from "../../../../../../../src/models/images/Image"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Both nodes exist, but have no ›belongs-to-node‹ relationship', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const partner = await seedNode(NodeTypeEnum.COMPANY)

    await expect(Image.getSpecificBelongsToNodeRelationship(image.id, partner.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
