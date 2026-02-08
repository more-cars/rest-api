import {CarModelNode} from "../../../../../src/models/car-models/types/CarModelNode"
import {seedNode} from "../../seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

export async function seedCarModelHasImageRelationship(carModel: CarModelNode) {
    const image = await seedNode(NodeTypeEnum.IMAGE)

    return createRelationship(carModel.id, image.id, DbRelationship.NodeHasImage)
}
