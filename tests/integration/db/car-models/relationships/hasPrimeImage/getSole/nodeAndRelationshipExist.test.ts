import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Node and relationship exist', async () => {
    const relationship = await seedRelationship(NodeTypeEnum.CAR_MODEL, NodeTypeEnum.IMAGE, DbRelationship.CarModelHasPrimeImage)

    const relationships = await getRelationshipsForSpecificNode(
        relationship.start_node_id,
        DbRelationship.CarModelHasPrimeImage,
    )

    expect(relationships.length)
        .toBe(1)
})