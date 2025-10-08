import {expect, test} from 'vitest'
import {
    marshalHasPrimeImageRelationship
} from "../../../../../../src/controllers/carModels/marshalling/marshalHasPrimeImageRelationship"
import {
    CarModelHasPrimeImageRelationship
} from "../../../../../../src/models/car-models/types/CarModelHasPrimeImageRelationship"

test('marshalling a complete and valid request', async () => {
    const relationship: CarModelHasPrimeImageRelationship = {
        car_model_id: 1,
        image_id: 2,
        relationship_id: 3,
        relationship_name: "has prime image",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const mappedNode = marshalHasPrimeImageRelationship(relationship)

    expect(mappedNode)
        .toStrictEqual({
            car_model_id: 1,
            image_id: 2,
            relationship_id: 3,
            relationship_name: "has-prime-image",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
