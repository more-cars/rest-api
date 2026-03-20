import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const image = await seedNode(DbNodeType.Image)

    const createdRelationship = await ModelCarBrand.createHasImageRelationship(modelCarBrand.properties.id, image.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(modelCarBrand.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.ModelCarBrandHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
