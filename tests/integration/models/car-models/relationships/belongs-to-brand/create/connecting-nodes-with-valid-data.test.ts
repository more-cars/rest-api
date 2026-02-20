import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a "Car Model belongs to Brand" relationship when both nodes exist', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const brand = await seedNode(ControllerNodeType.BRAND)

    const createdRelationship = await CarModel.createBelongsToBrandRelationship(carModel.properties.id, brand.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(carModel.properties.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(brand.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelBelongsToBrand)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
