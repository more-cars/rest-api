import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Node and relationship exist', async () => {
    const relationship = await seedRelationship(NodeTypeEnum.COMPANY, NodeTypeEnum.IMAGE, DbRelationship.CompanyHasPrimeImage)

    const relationships = await getRelationshipCollection(
        relationship.start_node_id,
        DbRelationship.CompanyHasPrimeImage,
    )

    expect(relationships.length)
        .toBe(1)
})