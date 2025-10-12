import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {Image} from "../../../../../../../src/models/images/Image"
import {ImageRelationship} from "../../../../../../../src/models/images/types/ImageRelationship"

test('Creating a ›belongs-to-node‹ relationship with valid data', async () => {
    const image = await seedImage()
    const partnerNode = await seedCarModel()

    const createdRelationship = await Image.createBelongsToNodeRelationship(image.id, partnerNode.id)

    expect(createdRelationship)
        .toHaveProperty('image_id', image.id)
    expect(createdRelationship)
        .toHaveProperty('partner_node_id', partnerNode.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', ImageRelationship.belongsToNode)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})
