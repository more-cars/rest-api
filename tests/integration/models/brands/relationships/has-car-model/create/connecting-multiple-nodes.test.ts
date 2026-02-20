import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

test('A BRAND can have multiple ›has-car-model‹ relationships', async () => {
    const brand = await seedNode(ControllerNodeType.BRAND)
    const carModelAmount = 3
    const carModels = await seedNodes(ControllerNodeType.CAR_MODEL, carModelAmount)

    for (const carModel of carModels) {
        await Brand.createHasCarModelRelationship(brand.id, carModel.id)
    }

    const relationships = await getRelationshipCollection(brand.id, RelationshipType.BrandHasCarModel, NodeTypeLabel.CarModel)

    expect(relationships.length)
        .toBe(carModelAmount)
})
