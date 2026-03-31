import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-main-video‹ relationship with valid data', async () => {
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const video = await seedNode(DbNodeType.Video)

    const createdRelationship = await ModelCarBrand.createHasMainVideoRelationship(modelCarBrand.properties.id, video.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(modelCarBrand.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(video.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.ModelCarBrandHasMainVideo)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
