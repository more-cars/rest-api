import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const image = await seedNode(ControllerNodeType.IMAGE)

    const createdRelationship = await CarModelVariant.createHasPrimeImageRelationship(carModelVariant.id, image.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(carModelVariant.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelVariantHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
