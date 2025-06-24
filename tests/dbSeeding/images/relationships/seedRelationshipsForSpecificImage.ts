import {ImageNode} from "../../../../src/db/nodes/images/types/ImageNode"
import {BaseRelationship} from "../../../../src/db/types/BaseRelationship"
import {seedRelationshipForSpecificImage} from "./seedRelationshipForSpecificImage"

export async function seedRelationshipsForSpecificImage(imageNode: ImageNode, amount: number) {
    const relationships: Array<BaseRelationship> = []

    for (let i = 0; i < amount; i++) {
        relationships.push(
            await seedRelationshipForSpecificImage(imageNode) as BaseRelationship
        )
    }

    return relationships
}
