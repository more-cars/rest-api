import {seedNode} from "../../seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

/**
 * Creates an image and another randomized node and connects them.
 */
export async function seedRelationship() {
    const imageNode = await seedNode(NodeTypeEnum.IMAGE)
    const partnerNode = await seedNode(NodeTypeEnum.CAR_MODEL)

    return createRelationship(partnerNode.id, imageNode.id, DbRelationship.NodeHasImage)
}
