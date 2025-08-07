import {expect, test} from 'vitest'
import {marshalRelationship} from "../../../../../../src/controllers/brands/marshalRelationship"
import {BrandHasCarModelRelationship} from "../../../../../../src/models/brands/types/BrandHasCarModelRelationship"

test('marshalling a complete and valid request', async () => {
    const relationship: BrandHasCarModelRelationship = {
        brand_id: 1,
        car_model_id: 2,
        relationship_id: 3,
        relationship_name: "HAS_CAR_MODEL",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const mappedNode = marshalRelationship(relationship)

    expect(mappedNode)
        .toStrictEqual({
            brand_id: 1,
            car_model_id: 2,
            relationship_id: 3,
            relationship_name: "HAS_CAR_MODEL",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
