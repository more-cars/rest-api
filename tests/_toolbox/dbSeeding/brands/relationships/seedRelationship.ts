import {BaseRelationship} from "../../../../../src/db/types/BaseRelationship"
import {seedNode} from "../../seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

export async function seedRelationship(): Promise<BaseRelationship> {
    const brandNode = await seedNode(NodeTypeEnum.BRAND)
    const carModelNode = await seedNode(NodeTypeEnum.CAR_MODEL)
    const relationship = await createRelationship(brandNode.id, carModelNode.id, DbRelationship.BrandHasCarModel)

    if (!relationship) {
        throw new Error("Failed to create relationship between brand and car model")
    }

    return relationship
}
