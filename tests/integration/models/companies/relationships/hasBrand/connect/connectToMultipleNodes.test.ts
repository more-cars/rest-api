import {expect, test} from 'vitest'
import {seedBrands} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrands"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A COMPANY can have multiple ›has-brand‹ relationships', async () => {
    const company = await seedCompany()
    const brandsAmount = 3
    const brands = await seedBrands(brandsAmount)

    for (const brand of brands) {
        await Company.createHasBrandRelationship(company.id, brand.id)
    }

    const relationships = await getRelationshipsForSpecificNode(company.id, DbRelationship.CompanyHasBrand)

    expect(relationships.length)
        .toBe(brandsAmount)
})
