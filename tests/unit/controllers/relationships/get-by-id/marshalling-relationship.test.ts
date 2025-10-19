import {expect, test} from 'vitest'
import FakeBrand from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import FakeImage from "../../../../_toolbox/fixtures/nodes/FakeImage"
import type {GenericRelation} from "../../../../../src/models/relationships/types/GenericRelation"
import {marshalRelation} from "../../../../../src/controllers/relationships/marshalRelation"

test('marshalled output for a generic relationship', async () => {
    const origin = Object.assign({}, FakeBrand, {
        id: 1,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const destination = Object.assign({}, FakeImage, {
        id: 2,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const relationship: GenericRelation = {
        id: 3,
        type: "HAS_GENERIC_RELATIONSHIP",
        origin,
        destination,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalRelation(relationship, "image")

    expect(marshalledData)
        .toStrictEqual({
            data: {
                relationship_id: 3,
                relationship_name: "has-generic-relationship",
                relationship_partner: {
                    node_type: "image",
                    data: destination,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        })
})
