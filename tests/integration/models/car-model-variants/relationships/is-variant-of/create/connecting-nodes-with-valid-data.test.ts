import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›is-variant-of‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const carModel = await seedNode(DbNodeType.CarModel)

    const createdRelationship = await CarModelVariant.createIsVariantOfRelationship(carModelVariant.properties.id, carModel.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(carModel.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelVariantIsVariantOf)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
