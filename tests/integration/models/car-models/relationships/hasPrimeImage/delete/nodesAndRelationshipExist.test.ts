import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Both nodes and the relationship exist', async () => {
    const seededRelationship = await seedRelationship(NodeTypeEnum.CAR_MODEL, NodeTypeEnum.IMAGE, DbRelationship.CarModelHasPrimeImage)

    const relationshipBefore = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.CarModelHasPrimeImage,
    )

    expect(relationshipBefore)
        .toBeTruthy()

    await CarModel.deleteHasPrimeImageRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

    const relationshipAfter = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.CarModelHasPrimeImage,
    )

    expect(relationshipAfter)
        .toBeFalsy()
})
