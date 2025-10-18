import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {BrandRelationship} from "../../../../../../../src/models/brands/types/BrandRelationship"

test('Creating a ›belongs-to-company‹ relationship with valid data', async () => {
    const brand = await seedBrand()
    const company = await seedCompany()

    const createdRelationship = await Brand.createBelongsToCompanyRelationship(brand.id, company.id)

    expect(createdRelationship.origin.id)
        .toEqual(brand.id)
    expect(createdRelationship.destination.id)
        .toEqual(company.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(BrandRelationship.belongsToCompany)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
