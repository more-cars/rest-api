import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {Image} from "../../../../../../../src/models/images/Image"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('IMAGE exists and has ›belongs-to-node‹ relationships', async () => {
    const image = await seedImage()
    await seedRelationshipForStartNode(image.id, NodeTypeEnum.BRAND, DbRelationship.NodeHasImage)
    await seedRelationshipForStartNode(image.id, NodeTypeEnum.BRAND, DbRelationship.NodeHasImage)

    const relationships = await Image.getAllBelongsToNodeRelationships(image.id)

    expect(relationships.length)
        .toBe(2)
})
