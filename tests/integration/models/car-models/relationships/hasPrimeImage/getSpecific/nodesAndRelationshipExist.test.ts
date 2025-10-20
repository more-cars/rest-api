import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Both nodes and a ›has-prime-image‹ relationship exist', async () => {
    const expectedRelationship = await seedRelationship(NodeTypeEnum.CAR_MODEL, NodeTypeEnum.IMAGE, DbRelationship.CarModelHasPrimeImage)
    const actualRelationship = await CarModel.getSpecificHasPrimeImageRelationship(expectedRelationship.start_node_id, expectedRelationship.end_node_id)

    expect(validateJson(actualRelationship, RelationshipSchema))
        .toBeTruthy()

    expect(actualRelationship.origin.id)
        .toBe(expectedRelationship.start_node_id)

    expect(actualRelationship.destination.id)
        .toBe(expectedRelationship.end_node_id)
})
