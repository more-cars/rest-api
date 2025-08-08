import {expect, test} from 'vitest'
import type {
    ImageBelongsToNodeTypeRelationships
} from "../../../../../../src/models/images/types/ImageBelongsToNodeTypeRelationships"
import {
    marshalBelongsToNodeTypeRelationships
} from "../../../../../../src/controllers/images/marshalBelongsToNodeTypeRelationships"

test('marshalling a complete and valid request', async () => {
    const relationships: ImageBelongsToNodeTypeRelationships = {
        brands: [{
            image_id: 10,
            partner_node_id: 20,
            relationship_id: 30,
            relationship_name: "BLUBB",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }, {
            image_id: 11,
            partner_node_id: 21,
            relationship_id: 31,
            relationship_name: "BLOBB",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }],
        car_models: [{
            image_id: 12,
            partner_node_id: 22,
            relationship_id: 32,
            relationship_name: "BLIBB",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }]
    }

    const mappedNode = marshalBelongsToNodeTypeRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual({
            brands: [{
                image_id: 10,
                partner_node_id: 20,
                relationship_id: 30,
                relationship_name: "BLUBB",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }, {
                image_id: 11,
                partner_node_id: 21,
                relationship_id: 31,
                relationship_name: "BLOBB",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }],
            car_models: [{
                image_id: 12,
                partner_node_id: 22,
                relationship_id: 32,
                relationship_name: "BLIBB",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }]
        })
})
