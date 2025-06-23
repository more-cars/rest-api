import {seedCarModel} from "../../car-models/nodes/seedCarModel"
import {createRelationship} from "../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../src/types/DbRelationship"
import {ImageNode} from "../../../../src/db/nodes/images/types/ImageNode"

export async function seedRelationshipForSpecificImage(imageNode: ImageNode) {
    const partnerNode = await seedCarModel()

    return createRelationship(imageNode.id, partnerNode.id, DbRelationship.ImageBelongsToNode)
}
