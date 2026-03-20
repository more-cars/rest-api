import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Price} from "../../../../../../../../src/models/node-types/prices/Price"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const price = await seedNode(DbNodeType.Price)
    const image = await seedNode(DbNodeType.Image)

    const createdRelationship = await Price.createHasPrimeImageRelationship(price.properties.id, image.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(price.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.PriceHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
