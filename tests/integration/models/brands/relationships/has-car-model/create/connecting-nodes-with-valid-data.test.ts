import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-car-model‹ relationship with valid data', async () => {
    const brand = await seedNode(ControllerNodeType.BRAND)
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

    const createdRelationship = await Brand.createHasCarModelRelationship(brand.properties.id, carModel.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(brand.properties.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(carModel.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.BrandHasCarModel)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
