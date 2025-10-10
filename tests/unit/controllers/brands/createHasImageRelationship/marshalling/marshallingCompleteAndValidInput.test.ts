import {expect, test} from 'vitest'
import FakeImageFull from "../../../../../_toolbox/fixtures/nodes/FakeImageFull"
import type {BrandHasImageRelationship} from "../../../../../../src/models/brands/types/BrandHasImageRelationship"
import {marshalRelationship} from "../../../../../../src/controllers/relationships/marshalRelationship"
import type {BaseRelationship} from "../../../../../../src/controllers/relationships/types/BaseRelationship"

test('marshalled output for ›has-image‹ relationship when provided with complete and valid input data', async () => {
    const partnerNode = Object.assign({}, FakeImageFull, {
        id: 2,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const relationship: BrandHasImageRelationship = {
        brand_id: 1,
        image_id: 2,
        relationship_id: 3,
        relationship_name: "HAS_IMAGE",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalRelationship(relationship as BaseRelationship, partnerNode, 'image')

    expect(marshalledData)
        .toStrictEqual({
            data: {
                relationship_id: 3,
                relationship_name: "has-image",
                relationship_partner: {
                    node_type: 'image',
                    data: partnerNode,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        })
})
