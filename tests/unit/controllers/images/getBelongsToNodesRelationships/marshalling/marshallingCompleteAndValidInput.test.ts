import {ImageBelongsToNodeRelationship} from "../../../../../../src/models/images/types/ImageBelongsToNodeRelationship"
import {marshalRelationships} from "../../../../../../src/controllers/images/marshalRelationships"

/**
 * @group happyPath
 */
test('marshalling a complete and valid request', async () => {
    const relationships: Array<ImageBelongsToNodeRelationship> = [
        {
            image_id: 10,
            partner_node_id: 20,
            relationship_id: 30,
            relationship_name: "BLUBB",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        },
        {
            image_id: 11,
            partner_node_id: 21,
            relationship_id: 31,
            relationship_name: "BLOBB",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        },
        {
            image_id: 12,
            partner_node_id: 22,
            relationship_id: 32,
            relationship_name: "BLIBB",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }
    ]

    const mappedNode = marshalRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual([
            {
                image_id: 10,
                partner_node_id: 20,
                relationship_id: 30,
                relationship_name: "BLUBB",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            },
            {
                image_id: 11,
                partner_node_id: 21,
                relationship_id: 31,
                relationship_name: "BLOBB",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            },
            {
                image_id: 12,
                partner_node_id: 22,
                relationship_id: 32,
                relationship_name: "BLIBB",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        ])
})
