import {CarModelNode} from "../../../../../src/models/car-models/types/CarModelNode"
import {seedImage} from "../../images/nodes/seedImage"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

export async function seedCarModelHasImageRelationship(carModel: CarModelNode) {
    const image = await seedImage()

    return createRelationship(carModel.id, image.id, DbRelationship.NodeHasImage)
}
