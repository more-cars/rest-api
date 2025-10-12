import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-brand‹ relationship again', async () => {
    const company = await seedCompany()
    const brand = await seedBrand()

    await expect(Company.createHasBrandRelationship(company.id, brand.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(Company.createHasBrandRelationship(company.id, brand.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
