import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"

test('Node and relationships exist', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)
    await seedRelationshipForStartNode(company.id, NodeTypeEnum.BRAND, DbRelationship.CompanyHasBrand)
    await seedRelationshipForStartNode(company.id, NodeTypeEnum.BRAND, DbRelationship.CompanyHasBrand)

    const relationships = await getRelationshipCollection(
        company.id,
        DbRelationship.CompanyHasBrand,
    )

    expect(relationships.length)
        .toBe(2)
})