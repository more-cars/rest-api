import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

test('A BRAND can have multiple ›has-car-model‹ relationships', async () => {
    const brand = await seedNode(ControllerNodeType.Brand)
    const carModelAmount = 3
    const carModels = await seedNodes(ControllerNodeType.CarModel, carModelAmount)

    for (const carModel of carModels) {
        await Brand.createHasCarModelRelationship(brand.properties.id, carModel.properties.id)
    }

    const relationships = await getRelationshipCollection(brand.properties.id, RelationshipType.BrandHasCarModel, DbNodeType.CarModel)

    expect(relationships.length)
        .toBe(carModelAmount)
})
