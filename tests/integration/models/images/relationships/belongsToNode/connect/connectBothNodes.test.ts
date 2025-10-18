import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {Image} from "../../../../../../../src/models/images/Image"
import {ImageRelationship} from "../../../../../../../src/models/images/types/ImageRelationship"

test('Creating a ›belongs-to-node‹ relationship with valid data', async () => {
    const image = await seedImage()
    const partnerNode = await seedCarModel()

    const createdRelationship = await Image.createBelongsToNodeRelationship(image.id, partnerNode.id)

    expect(createdRelationship.origin.id)
        .toEqual(image.id)
    expect(createdRelationship.destination.id)
        .toEqual(partnerNode.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(ImageRelationship.belongsToNode)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
