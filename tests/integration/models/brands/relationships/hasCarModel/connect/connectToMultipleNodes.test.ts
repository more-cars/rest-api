import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A BRAND can have multiple ›has-car-model‹ relationships', async () => {
    const brand = await seedBrand()
    const carModelAmount = 3
    const carModels = await seedNodes(NodeTypeEnum.CAR_MODEL, carModelAmount)

    for (const carModel of carModels) {
        await Brand.createHasCarModelRelationship(brand.id, carModel.id)
    }

    const relationships = await getRelationshipCollection(brand.id, DbRelationship.BrandHasCarModel)

    expect(relationships.length)
        .toBe(carModelAmount)
})
