import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {Company} from "../../../../../../../src/models/companies/Company"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('COMPANY exists and has ›has-image‹ relationships', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)
    await seedRelationshipForStartNode(company.id, NodeTypeEnum.IMAGE, DbRelationship.CompanyHasImage)
    await seedRelationshipForStartNode(company.id, NodeTypeEnum.IMAGE, DbRelationship.CompanyHasImage)

    const relationships = await Company.getAllHasImageRelationships(company.id)

    expect(relationships.length)
        .toBe(2)
})
