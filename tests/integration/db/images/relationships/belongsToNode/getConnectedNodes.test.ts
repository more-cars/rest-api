import {seedRelationship} from "../../../../../dbSeeding/images/relationships/seedRelationship"
import {getRelationship} from "../../../../../../src/db/getRelationship"
import {DbRelationship} from "../../../../../../src/types/DbRelationship"

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
            await getRelationship(imageId, partnerNodeId, DbRelationship.ImageBelongsToNode)

        expect(fetchedRelationship)
            .toHaveProperty('start_node_id', imageId)
        expect(fetchedRelationship)
            .toHaveProperty('end_node_id', partnerNodeId)
        expect(fetchedRelationship)
            .toHaveProperty('relationship_id', relationshipId)
        expect(fetchedRelationship)
            .toHaveProperty('relationship_name', relationshipName)
    })
})
