import {expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {Company} from "../../../../../../../src/models/companies/Company"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('COMPANY exists and has ›has-brand‹ relationships', async () => {
    const company = await seedCompany()
    await seedRelationshipForStartNode(company.id, NodeTypeEnum.BRAND, DbRelationship.CompanyHasBrand)
    await seedRelationshipForStartNode(company.id, NodeTypeEnum.BRAND, DbRelationship.CompanyHasBrand)

    const relationships = await Company.getAllHasBrandRelationships(company.id)

    expect(relationships.length)
        .toBe(2)
})
