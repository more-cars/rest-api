import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"

test('IMAGE exists, but has no ›belongs-to-node‹ relationships', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const relationships = await Image.getAllBelongsToNodeRelationships(image.id)

    expect(relationships.length)
        .toBe(0)
})
