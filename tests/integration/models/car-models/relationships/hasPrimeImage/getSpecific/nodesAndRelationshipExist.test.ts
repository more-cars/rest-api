import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/controller/RelationshipSchema"

test('Both nodes and a ›has-prime-image‹ relationship exist', async () => {
    const expectedRelationship = await seedRelationship('car model', 'image', DbRelationship.CarModelHasPrimeImage)
    const actualRelationship = await CarModel.getSpecificHasPrimeImageRelationship(expectedRelationship.start_node_id, expectedRelationship.end_node_id)

    validateJson(actualRelationship, RelationshipSchema)

    expect(actualRelationship.origin.id)
        .toBe(expectedRelationship.start_node_id)

    expect(actualRelationship.destination.id)
        .toBe(expectedRelationship.end_node_id)
})
