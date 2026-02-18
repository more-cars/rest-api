import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-variant‹ relationship with valid data', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

    const createdRelationship = await CarModel.createHasVariantRelationship(carModel.id, carModelVariant.id)

    expect(createdRelationship.origin.id)
        .toEqual(carModel.id)
    expect(createdRelationship.destination.id)
        .toEqual(carModelVariant.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelHasVariant)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
