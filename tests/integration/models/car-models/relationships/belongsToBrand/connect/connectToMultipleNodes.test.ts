import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A CAR MODEL cannot have multiple ›belongs-to-brand‹ relationships', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const brandsAmount = 3
    const brands = await seedNodes(NodeTypeEnum.BRAND, brandsAmount)

    for (const brand of brands) {
        await CarModel.createBelongsToBrandRelationship(carModel.id, brand.id)
    }

    const relationships = await getRelationshipCollection(carModel.id, DbRelationship.BrandHasCarModel)

    expect(relationships.length)
        .toBe(1)
})
