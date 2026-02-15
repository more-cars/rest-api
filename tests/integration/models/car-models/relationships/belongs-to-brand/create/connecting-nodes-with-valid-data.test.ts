import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelationshipType} from "../../../../../../../src/models/relationships/types/RelationshipType"

test('Creating a "Car Model belongs to Brand" relationship when both nodes exist', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const brand = await seedNode(NodeTypeEnum.BRAND)

    const createdRelationship = await CarModel.createBelongsToBrandRelationship(carModel.id, brand.id)

    expect(createdRelationship.origin.id)
        .toEqual(carModel.id)
    expect(createdRelationship.destination.id)
        .toEqual(brand.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelationshipType.CarModelBelongsToBrand)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
