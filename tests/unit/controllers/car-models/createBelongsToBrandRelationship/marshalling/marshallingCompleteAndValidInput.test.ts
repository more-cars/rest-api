import {marshalRelationship} from "../../../../../../src/controllers/carModels/marshalRelationship"
import {
    CarModelBelongsToBrandRelationship
} from "../../../../../../src/models/car-models/types/CarModelBelongsToBrandRelationship"

/**
 * @group happyPath
 */
test('marshalling a complete and valid request', async () => {
    const relationship: CarModelBelongsToBrandRelationship = {
        car_model_id: 1,
        brand_id: 2,
        relationship_id: 3,
        relationship_name: "BELONGS_TO_BRAND",
    }

    const mappedNode = marshalRelationship(relationship)

    expect(mappedNode)
        .toStrictEqual({
            car_model_id: 1,
            brand_id: 2,
            relationship_id: 3,
            relationship_name: "BELONGS_TO_BRAND",
        })
})
