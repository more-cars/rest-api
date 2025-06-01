import {ImageNode} from "../../../../src/types/images/ImageNode"
import {BaseRelationship} from "../../../../src/types/BaseRelationship"
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
