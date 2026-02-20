import {Relationship} from "../../../../../src/db/types/Relationship"
import {seedNode} from "../../seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"

export async function seedRelationship(): Promise<Relationship> {
    const brandNode = await seedNode(ControllerNodeType.BRAND)
    const carModelNode = await seedNode(ControllerNodeType.CAR_MODEL)
    const relationship = await createRelationship(brandNode.properties.id, carModelNode.properties.id, RelationshipType.BrandHasCarModel)

    if (!relationship) {
        throw new Error("Failed to create relationship between brand and car model")
    }

    return relationship
}
