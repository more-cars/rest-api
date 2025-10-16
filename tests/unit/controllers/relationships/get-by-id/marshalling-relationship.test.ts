import {expect, test} from 'vitest'
import FakeImage from "../../../../_toolbox/fixtures/nodes/FakeImage"
import {marshalRelationship} from "../../../../../src/controllers/relationships/marshalRelationship"
import type {BaseRelationship} from "../../../../../src/controllers/relationships/types/BaseRelationship"
import type {GenericRelationship} from "../../../../../src/models/relationships/types/GenericRelationship"

test('marshalled output for a generic relationship', async () => {
    const partnerNode = Object.assign({}, FakeImage, {
        id: 2,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const relationship: GenericRelationship = {
        start_node_id: 1,
        end_node_id: 2,
        relationship_id: 3,
        relationship_name: "IS_GENERIC_RELATIONSHIP",
        relationship_partner: partnerNode,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalRelationship(relationship as BaseRelationship, partnerNode, "image")

    expect(marshalledData)
        .toStrictEqual({
            data: {
                relationship_id: 3,
                relationship_name: "is-generic-relationship",
                relationship_partner: {
                    node_type: "image",
                    data: partnerNode,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        })
})
