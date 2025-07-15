import {seedImage} from "../nodes/seedImage"
import {seedCarModel} from "../../car-models/nodes/seedCarModel"
import {createRelationship} from "../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../src/db/types/DbRelationship"

/**
 * Creates an image and another randomized node and connects them.
 */
export async function seedRelationship() {
    const imageNode = await seedImage()
    const partnerNode = await seedCarModel()

    return createRelationship(partnerNode.id, imageNode.id, DbRelationship.NodeHasImage)
}
