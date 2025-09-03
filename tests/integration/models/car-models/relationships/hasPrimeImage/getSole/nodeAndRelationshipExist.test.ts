import {expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {CarModelHasPrimeImageSchema} from "../../../../../../_toolbox/schemas/CarModelHasPrimeImageSchema"

test('Car Model and relationship exist', async () => {
    const expectedRelationship = await seedRelationship('car model', 'image', DbRelationship.CarModelHasPrimeImage)
    const actualRelationship = await CarModel.getHasPrimeImageRelationship(expectedRelationship.start_node_id)

    validateJson(actualRelationship, CarModelHasPrimeImageSchema)

    expect(actualRelationship.car_model_id)
        .toBe(expectedRelationship.start_node_id)

    expect(actualRelationship.image_id)
        .toBe(expectedRelationship.end_node_id)
})
