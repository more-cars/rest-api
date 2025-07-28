import {expect, test} from 'vitest'
import {
    marshalHasImageRelationships
} from "../../../../../../src/controllers/carModels/marshalling/marshalHasImageRelationships"
import {CarModelHasImageRelationship} from "../../../../../../src/models/car-models/types/CarModelHasImageRelationship"

test('marshalling a complete and valid request', async () => {
    const relationships: Array<CarModelHasImageRelationship> = [
        {
            car_model_id: 1,
            image_id: 2,
            relationship_id: 3,
            relationship_name: "HAS_IMAGE",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            car_model_id: 10,
            image_id: 20,
            relationship_id: 30,
            relationship_name: "HAS_IMAGE",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            car_model_id: 100,
            image_id: 200,
            relationship_id: 300,
            relationship_name: "HAS_IMAGE",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        }
    ]

    const mappedNode = marshalHasImageRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual([
            {
                car_model_id: 1,
                image_id: 2,
                relationship_id: 3,
                relationship_name: "HAS_IMAGE",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            },
            {
                car_model_id: 10,
                image_id: 20,
                relationship_id: 30,
                relationship_name: "HAS_IMAGE",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            },
            {
                car_model_id: 100,
                image_id: 200,
                relationship_id: 300,
                relationship_name: "HAS_IMAGE",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            }
        ])
})
