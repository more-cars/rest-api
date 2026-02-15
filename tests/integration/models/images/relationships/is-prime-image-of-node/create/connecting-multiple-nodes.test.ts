import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A IMAGE can have multiple ›is-prime-image-of-node‹ relationships', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const nodesAmount = 3
    const nodes = await seedNodes(NodeTypeEnum.COMPANY, nodesAmount)

    for (const node of nodes) {
        await Image.createIsPrimeImageOfNodeRelationship(image.id, node.id)
    }

    const relationships = await getRelationshipCollection(
        image.id,
        DbRelationship.ImageIsPrimeImageOfNode,
        NodeTypeLabel.Image,
    )

    expect(relationships.length)
        .toBe(nodesAmount)
})
