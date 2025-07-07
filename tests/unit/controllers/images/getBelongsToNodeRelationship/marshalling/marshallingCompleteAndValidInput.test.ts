import {marshalRelationship} from "../../../../../../src/controllers/images/marshalRelationship"
import {ImageBelongsToNodeRelationship} from "../../../../../../src/models/images/types/ImageBelongsToNodeRelationship"

/**
 * @group happyPath
 */
test('marshalling a complete and valid request', async () => {
    const relationship: ImageBelongsToNodeRelationship = {
        image_id: 10,
        partner_node_id: 20,
        relationship_id: 30,
        relationship_name: "BLUBB",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const mappedNode = marshalRelationship(relationship)

    expect(mappedNode)
        .toStrictEqual({
            image_id: 10,
            partner_node_id: 20,
            relationship_id: 30,
            relationship_name: "BLUBB",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
