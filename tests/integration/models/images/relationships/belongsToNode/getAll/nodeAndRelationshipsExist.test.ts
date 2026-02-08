import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {Image} from "../../../../../../../src/models/images/Image"

test('IMAGE exists and has ›belongs-to-node‹ relationships', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    await seedRelationshipForStartNode(image.id, NodeTypeEnum.BRAND, DbRelationship.NodeHasImage)
    await seedRelationshipForStartNode(image.id, NodeTypeEnum.BRAND, DbRelationship.NodeHasImage)

    const relationships = await Image.getAllBelongsToNodeRelationships(image.id)

    expect(relationships.length)
        .toBe(2)
})
