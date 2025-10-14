import {expect, test} from 'vitest'
import FakeImage from "../../../../_toolbox/fixtures/nodes/FakeImage"
import type {BrandHasPrimeImageRelationship} from "../../../../../src/models/brands/types/BrandHasPrimeImageRelationship"
import {marshalRelationship} from "../../../../../src/controllers/relationships/marshalRelationship"
import type {BaseRelationship} from "../../../../../src/controllers/relationships/types/BaseRelationship"

test('marshalled output for ›has-prime-image‹ relationship when provided with complete and valid input data', async () => {
    const partnerNode = Object.assign({}, FakeImage, {
        id: 2,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const relationship: BrandHasPrimeImageRelationship = {
        brand_id: 1,
        image_id: 2,
        relationship_id: 3,
        relationship_name: "HAS_PRIME_IMAGE",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalRelationship(relationship as BaseRelationship, partnerNode, "image")

    expect(marshalledData)
        .toStrictEqual({
            data: {
                relationship_id: 3,
                relationship_name: "has-prime-image",
                relationship_partner: {
                    node_type: "image",
                    data: partnerNode,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        })
})
