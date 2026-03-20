import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Price} from "../../../../../../../../src/models/node-types/prices/Price"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›for-car-model-variant‹ relationship with valid data', async () => {
    const price = await seedNode(DbNodeType.Price)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    const createdRelationship = await Price.createForCarModelVariantRelationship(price.properties.id, carModelVariant.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(price.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.PriceForCarModelVariant)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
