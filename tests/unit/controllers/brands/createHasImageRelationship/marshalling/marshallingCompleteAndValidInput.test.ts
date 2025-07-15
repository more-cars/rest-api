import {BrandHasImageRelationship} from "../../../../../../src/models/brands/types/BrandHasImageRelationship"
import {
    marshalHasImageRelationship
} from "../../../../../../src/controllers/brands/marshalling/marshalHasImageRelationship"

test('marshalling a complete and valid request', async () => {
    const relationship: BrandHasImageRelationship = {
        brand_id: 1,
        image_id: 2,
        relationship_id: 3,
        relationship_name: "HAS_IMAGE",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const mappedNode = marshalHasImageRelationship(relationship)

    expect(mappedNode)
        .toStrictEqual({
            brand_id: 1,
            image_id: 2,
            relationship_id: 3,
            relationship_name: "HAS_IMAGE",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
