import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Expecting the relationship ID to not change when creating the same ›has-brand‹ relationship again', async () => {
    const company = await seedCompany()
    const brand = await seedBrand()

    await expect(Company.createHasBrandRelationship(company.id, brand.id))
        .resolves
        .not.toThrow(NodeNotFoundError)

    await expect(Company.createHasBrandRelationship(company.id, brand.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
