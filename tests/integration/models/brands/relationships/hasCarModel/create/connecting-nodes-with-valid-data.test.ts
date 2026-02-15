import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {BrandRelationship} from "../../../../../../../src/models/brands/types/BrandRelationship"

test('Creating a ›has-car-model‹ relationship with valid data', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    const createdRelationship = await Brand.createHasCarModelRelationship(brand.id, carModel.id)

    expect(createdRelationship.origin.id)
        .toEqual(brand.id)
    expect(createdRelationship.destination.id)
        .toEqual(carModel.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(BrandRelationship.hasCarModel)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
