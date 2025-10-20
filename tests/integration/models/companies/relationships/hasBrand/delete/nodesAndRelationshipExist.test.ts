import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {Company} from "../../../../../../../src/models/companies/Company"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Both nodes and the relationship exist', async () => {
    const seededRelationship = await seedRelationship(NodeTypeEnum.COMPANY, NodeTypeEnum.BRAND, DbRelationship.CompanyHasBrand)

    const relationshipBefore = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.CompanyHasBrand,
    )

    expect(relationshipBefore)
        .toBeTruthy()

    await Company.deleteHasBrandRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

    const relationshipAfter = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.CompanyHasBrand,
    )

    expect(relationshipAfter)
        .toBeFalsy()
})
