import {expect, test} from 'vitest'
import {
    marshalBelongsToNodeRelationship
} from "../../../../../../src/controllers/images/marshalling/marshalBelongsToNodeRelationship"
import {ImageBelongsToNodeRelationship} from "../../../../../../src/models/images/types/ImageBelongsToNodeRelationship"

test('marshalling a complete and valid request', async () => {
    const relationship: ImageBelongsToNodeRelationship = {
        image_id: 1,
        partner_node_id: 2,
        relationship_id: 3,
        relationship_name: "BELONGS_TO_NODE",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const mappedNode = marshalBelongsToNodeRelationship(relationship)

    expect(mappedNode)
        .toStrictEqual({
            image_id: 1,
            partner_node_id: 2,
            relationship_id: 3,
            relationship_name: "belongs-to-node",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
