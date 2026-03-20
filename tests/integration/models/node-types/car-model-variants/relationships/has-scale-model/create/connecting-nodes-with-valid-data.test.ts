import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-scale-model‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const modelCar = await seedNode(DbNodeType.ModelCar)

    const createdRelationship = await CarModelVariant.createHasScaleModelRelationship(carModelVariant.properties.id, modelCar.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(modelCar.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelVariantHasScaleModel)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
