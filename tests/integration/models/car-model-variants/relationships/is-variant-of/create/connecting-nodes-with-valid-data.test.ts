import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›is-variant-of‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

    const createdRelationship = await CarModelVariant.createIsVariantOfRelationship(carModelVariant.id, carModel.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(carModelVariant.id)
    expect(createdRelationship.destination.properties.id)
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
