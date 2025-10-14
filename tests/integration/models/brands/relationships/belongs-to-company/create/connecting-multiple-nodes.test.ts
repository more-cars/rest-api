import {expect, test} from 'vitest'
import {seedCompanies} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompanies"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A BRAND cannot have multiple ›belongs-to-company‹ relationships', async () => {
    const brand = await seedBrand()
    const companiesAmount = 3
    const companies = await seedCompanies(companiesAmount)

    for (const company of companies) {
        await Brand.createBelongsToCompanyRelationship(brand.id, company.id)
    }

    const relationships = await getRelationshipsForSpecificNode(brand.id, DbRelationship.BrandBelongsToCompany)

    expect(relationships.length)
        .toBe(1)
})
