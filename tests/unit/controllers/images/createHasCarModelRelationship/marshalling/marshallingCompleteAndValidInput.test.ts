import {marshalRelationship} from "../../../../../../src/controllers/images/marshalRelationship"
import {ImageBelongsToNodeRelationship} from "../../../../../../src/models/images/types/ImageBelongsToNodeRelationship"

/**
 * @group happyPath
 */
test('marshalling a complete and valid request', async () => {
    const relationship: ImageBelongsToNodeRelationship = {
        image_id: 1,
        partner_node_id: 2,
        relationship_id: 3,
        relationship_name: "BELONGS_TO_NODE",
    }

    const mappedNode = marshalRelationship(relationship)

    expect(mappedNode)
        .toStrictEqual({
            image_id: 1,
            partner_node_id: 2,
            relationship_id: 3,
            relationship_name: "BELONGS_TO_NODE",
        })
})
