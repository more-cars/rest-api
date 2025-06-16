import {seedImage} from "../../../../../dbSeeding/images/nodes/seedImage"
import {Image} from "../../../../../../src/models/images/Image"
import {seedBrand} from "../../../../../dbSeeding/brands/nodes/seedBrand"

test('An image can be connected to multiple nodes of the same type', async () => {
    const imageNode = await seedImage()
    const brandNode1 = await seedBrand()
    const brandNode2 = await seedBrand()
    const brandNode3 = await seedBrand()

    const createdRelationship1 = await Image.createBelongsToNodeRelationship(imageNode.id, brandNode1.id)
    expect(createdRelationship1).not.toBeFalsy()

    const createdRelationship2 = await Image.createBelongsToNodeRelationship(imageNode.id, brandNode2.id)
    expect(createdRelationship2).not.toBeFalsy()

    const createdRelationship3 = await Image.createBelongsToNodeRelationship(imageNode.id, brandNode3.id)
    expect(createdRelationship3).not.toBeFalsy()
})
