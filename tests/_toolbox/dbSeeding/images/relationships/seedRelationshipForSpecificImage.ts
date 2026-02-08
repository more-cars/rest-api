import {seedNode} from "../../seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {ImageNode} from "../../../../../src/db/nodes/images/types/ImageNode"

export async function seedRelationshipForSpecificImage(imageNode: ImageNode) {
    const partnerNode = await seedNode(NodeTypeEnum.CAR_MODEL)

    return createRelationship(partnerNode.id, imageNode.id, DbRelationship.NodeHasImage)
}
