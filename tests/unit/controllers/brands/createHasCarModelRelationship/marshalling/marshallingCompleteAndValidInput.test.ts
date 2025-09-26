import {expect, test} from 'vitest'
import {
    marshalHasCarModelRelationship
} from "../../../../../../src/controllers/brands/marshalling/marshalHasCarModelRelationship"
import {BrandHasCarModelRelationship} from "../../../../../../src/models/brands/types/BrandHasCarModelRelationship"

test('marshalled output for ›has-car-model‹ relationship when provided with complete and valid input data', async () => {
    const relationship: BrandHasCarModelRelationship = {
        brand_id: 1,
        car_model_id: 2,
        relationship_id: 3,
        relationship_name: "HAS_CAR_MODEL",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalHasCarModelRelationship(relationship)

    expect(marshalledData)
        .toStrictEqual({
            brand_id: 1,
            car_model_id: 2,
            relationship_id: 3,
            relationship_name: "HAS_CAR_MODEL",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
