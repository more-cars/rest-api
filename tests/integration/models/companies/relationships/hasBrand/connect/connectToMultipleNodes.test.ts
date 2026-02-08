import {expect, test} from 'vitest'
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A COMPANY can have multiple ›has-brand‹ relationships', async () => {
    const company = await seedCompany()
    const brandsAmount = 3
    const brands = await seedNodes(NodeTypeEnum.BRAND, brandsAmount)

    for (const brand of brands) {
        await Company.createHasBrandRelationship(company.id, brand.id)
    }

    const relationships = await getRelationshipCollection(company.id, DbRelationship.CompanyHasBrand)

    expect(relationships.length)
        .toBe(brandsAmount)
})
