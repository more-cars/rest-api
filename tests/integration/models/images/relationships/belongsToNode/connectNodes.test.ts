import {seedImage} from "../../../../../dbSeeding/seedImage"
import {seedCarModel} from "../../../../../dbSeeding/seedCarModel"
import {BaseNode} from "../../../../../../src/types/BaseNode"
import {ImageRelationship} from "../../../../../../src/types/images/ImageRelationship"
import {Image} from "../../../../../../src/models/Image"

describe('Image', () => {
    test('Creating a "Image belongs to Node" relationship when both nodes exist', async () => {
        const image = await seedImage()
        const partnerNode: BaseNode = await seedCarModel()

        const createdRelationship = await Image.createBelongsToNodeRelationship(image.id, partnerNode.id)

        expect(createdRelationship)
            .toHaveProperty('image_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('partner_node_id', partnerNode.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', ImageRelationship.belongsToNode)
    })
})
