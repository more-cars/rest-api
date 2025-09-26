import {expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Company} from "../../../../../../../src/models/companies/Company"
import {CompanyRelationship} from "../../../../../../../src/models/companies/types/CompanyRelationship"

test('Creating a ›has-brand‹ relationship with valid data', async () => {
    const company = await seedCompany()
    const brand = await seedBrand()

    const createdRelationship = await Company.createHasBrandRelationship(company.id, brand.id)

    expect(createdRelationship)
        .toHaveProperty('company_id', company.id)
    expect(createdRelationship)
        .toHaveProperty('brand_id', brand.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', CompanyRelationship.hasBrand)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})
