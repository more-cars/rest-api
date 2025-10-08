import {expect, test} from 'vitest'
import {
    marshalBelongsToBrandRelationship
} from "../../../../../../src/controllers/carModels/marshalling/marshalBelongsToBrandRelationship"
import {
    CarModelBelongsToBrandRelationship
} from "../../../../../../src/models/car-models/types/CarModelBelongsToBrandRelationship"

test('marshalling a complete and valid request', async () => {
    const relationship: CarModelBelongsToBrandRelationship = {
        car_model_id: 10,
        brand_id: 20,
        relationship_id: 30,
        relationship_name: "BLOBB",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const mappedNode = marshalBelongsToBrandRelationship(relationship)

    expect(mappedNode)
        .toStrictEqual({
            car_model_id: 10,
            brand_id: 20,
            relationship_id: 30,
            relationship_name: "blobb",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
