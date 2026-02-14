import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A BRAND can have multiple ›has-car-model‹ relationships', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const carModelAmount = 3
    const carModels = await seedNodes(NodeTypeEnum.CAR_MODEL, carModelAmount)

    for (const carModel of carModels) {
        await Brand.createHasCarModelRelationship(brand.id, carModel.id)
    }

    const relationships = await getRelationshipCollection(
        brand.id,
        DbRelationship.BrandHasCarModel,
        NodeTypeLabel.CarModel,
        RelationshipDirection.FORWARD,
    )

    expect(relationships.length)
        .toBe(carModelAmount)
})
