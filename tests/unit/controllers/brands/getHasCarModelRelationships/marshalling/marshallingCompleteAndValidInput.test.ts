import {BrandHasCarModelRelationship} from "../../../../../../src/models/brands/types/BrandHasCarModelRelationship"
import {marshalRelationships} from "../../../../../../src/controllers/brands/marshalRelationships"

/**
 * @group happyPath
 */
test('marshalling a complete and valid request', async () => {
    const relationships: Array<BrandHasCarModelRelationship> = [
        {
            brand_id: 1,
            car_model_id: 2,
            relationship_id: 3,
            relationship_name: "HAS_CAR_MODEL",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            brand_id: 10,
            car_model_id: 20,
            relationship_id: 30,
            relationship_name: "HAS_CAR_MODEL",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            brand_id: 100,
            car_model_id: 200,
            relationship_id: 300,
            relationship_name: "HAS_CAR_MODEL",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        }
    ]

    const mappedNode = marshalRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual([
            {
                brand_id: 1,
                car_model_id: 2,
                relationship_id: 3,
                relationship_name: "HAS_CAR_MODEL",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            },
            {
                brand_id: 10,
                car_model_id: 20,
                relationship_id: 30,
                relationship_name: "HAS_CAR_MODEL",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            },
            {
                brand_id: 100,
                car_model_id: 200,
                relationship_id: 300,
                relationship_name: "HAS_CAR_MODEL",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            }
        ])
})
