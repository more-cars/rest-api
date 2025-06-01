import {seedImage} from "../../../../../dbSeeding/images/nodes/seedImage"
import {Image} from "../../../../../../src/models/Image"
import {
    seedRelationshipsForSpecificImage
} from "../../../../../dbSeeding/images/relationships/seedRelationshipsForSpecificImage"
import {DbRelationship} from "../../../../../../src/types/DbRelationship"

describe('Image', () => {
    test('Get all "Image belongs to Node" relationships for specific image', async () => {
        const imageNode = await seedImage()
        const amount = 7
        await seedRelationshipsForSpecificImage(imageNode, amount)

        const fetchedRelationships = await Image.getBelongsToNodeRelationships(imageNode.id)

        expect(fetchedRelationships)
            .toHaveLength(amount)

        fetchedRelationships.forEach(relationship => {
            expect(relationship.image_id)
                .toBe(imageNode.id)
            expect(relationship.relationship_name)
                .toBe(DbRelationship.ImageBelongsToNode)
        })
    })

    test('Expecting empty list when there are no such relationships', async () => {
        const imageNode = await seedImage()
        const fetchedRelationships = await Image.getBelongsToNodeRelationships(imageNode.id)

        expect(fetchedRelationships)
            .toHaveLength(0)
    })
})
