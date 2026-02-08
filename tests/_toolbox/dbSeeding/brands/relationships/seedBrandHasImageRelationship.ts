import {BrandNode} from "../../../../../src/models/brands/types/BrandNode"
import {seedNode} from "../../seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {createRelationship} from "../../../../../src/db/relationships/createRelationship"

export async function seedBrandHasImageRelationship(brand: BrandNode) {
    const image = await seedNode(NodeTypeEnum.IMAGE)

    return createRelationship(brand.id, image.id, DbRelationship.NodeHasImage)
}
