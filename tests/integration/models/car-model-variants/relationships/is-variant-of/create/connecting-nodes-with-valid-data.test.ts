import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›is-variant-of‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    const createdRelationship = await CarModelVariant.createIsVariantOfRelationship(carModelVariant.id, carModel.id)

    expect(createdRelationship.origin.id)
        .toEqual(carModelVariant.id)
    expect(createdRelationship.destination.id)
        .toEqual(carModel.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelVariantIsVariantOf)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
