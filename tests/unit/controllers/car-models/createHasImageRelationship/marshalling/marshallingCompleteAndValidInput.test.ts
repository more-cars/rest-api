import {expect, test} from 'vitest'
import {
    marshalHasImageRelationship
} from "../../../../../../src/controllers/carModels/marshalling/marshalHasImageRelationship"
import {CarModelHasImageRelationship} from "../../../../../../src/models/car-models/types/CarModelHasImageRelationship"

test('marshalling a complete and valid request', async () => {
    const relationship: CarModelHasImageRelationship = {
        car_model_id: 1,
        image_id: 2,
        relationship_id: 3,
        relationship_name: "HAS_IMAGE",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const mappedNode = marshalHasImageRelationship(relationship)

    expect(mappedNode)
        .toStrictEqual({
            car_model_id: 1,
            image_id: 2,
            relationship_id: 3,
            relationship_name: "HAS_IMAGE",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
