import {marshalRelationship} from "../../../../../../src/controllers/carModels/marshalRelationship"
import {
    CarModelBelongsToBrandRelationship
} from "../../../../../../src/models/car-models/types/CarModelBelongsToBrandRelationship"

/**
 * @group happyPath
 */
test('marshalling a complete and valid request', async () => {
    const relationship: CarModelBelongsToBrandRelationship = {
        car_model_id: 10,
        brand_id: 20,
        relationship_id: 30,
        relationship_name: "BLOBB",
    }

    const mappedNode = marshalRelationship(relationship)

    expect(mappedNode)
        .toStrictEqual({
            car_model_id: 10,
            brand_id: 20,
            relationship_id: 30,
            relationship_name: "BLOBB",
        })
})
