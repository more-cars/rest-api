import {expect, test} from 'vitest'
import FakeBrand from "../../../../../_toolbox/fixtures/nodes/FakeBrand"
import {ImageBelongsToNodeRelationship} from "../../../../../../src/models/images/types/ImageBelongsToNodeRelationship"
import {marshalRelationship} from "../../../../../../src/controllers/relationships/marshalRelationship"

test('marshalled output for ›has-brand‹ relationship when provided with complete and valid input data', async () => {
    const partnerNode = Object.assign({}, FakeBrand, {
        id: 2,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const relationship: ImageBelongsToNodeRelationship = {
        image_id: 1,
        partner_node_id: 2,
        relationship_id: 3,
        relationship_name: "BELONGS_TO_NODE",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalRelationship(relationship, partnerNode, 'brand')

    expect(marshalledData)
        .toStrictEqual({
            data: {
                relationship_id: 3,
                relationship_name: "belongs-to-node",
                relationship_partner: {
                    node_type: 'brand',
                    data: partnerNode,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        })
})
