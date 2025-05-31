import {seedRelationship} from "../../../../../dbSeeding/images/relationships/seedRelationship"
import {Image} from "../../../../../../src/models/Image"

describe('Image', () => {
    test('Get a "Image belongs to Node" relationship when both nodes exist', async () => {
        const relationship = await seedRelationship()

        if (!relationship) {
            return
        }

        const imageId = relationship.start_node_id
        const partnerNodeId = relationship.end_node_id
        const relationshipId = relationship.relationship_id
        const relationshipName = relationship.relationship_name

        const fetchedRelationship =
            await Image.createBelongsToNodeRelationship(imageId, partnerNodeId)

        expect(fetchedRelationship)
            .toHaveProperty('image_id', imageId)
        expect(fetchedRelationship)
            .toHaveProperty('partner_node_id', partnerNodeId)
        expect(fetchedRelationship)
            .toHaveProperty('relationship_id', relationshipId)
        expect(fetchedRelationship)
            .toHaveProperty('relationship_name', relationshipName)
    })
})
