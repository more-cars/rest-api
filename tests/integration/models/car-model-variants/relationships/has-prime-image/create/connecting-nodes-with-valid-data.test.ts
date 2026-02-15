import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"
import {RelationshipType} from "../../../../../../../src/models/relationships/types/RelationshipType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await CarModelVariant.createHasPrimeImageRelationship(carModelVariant.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(carModelVariant.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelationshipType.CarModelVariantHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
