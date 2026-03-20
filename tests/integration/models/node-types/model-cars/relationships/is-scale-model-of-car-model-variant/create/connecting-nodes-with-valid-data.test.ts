import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›is-scale-model-of-car-model-variant‹ relationship with valid data', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    const createdRelationship = await ModelCar.createIsScaleModelOfCarModelVariantRelationship(modelCar.properties.id, carModelVariant.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(modelCar.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.ModelCarIsScaleModelOfCarModelVariant)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
