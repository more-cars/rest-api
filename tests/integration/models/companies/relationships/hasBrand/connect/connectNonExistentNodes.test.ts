import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-brand‹ relationship with nodes that do not exist', async () => {
    const company = await seedCompany()
    const brand = await seedBrand()

    await expect(Company.createHasBrandRelationship(-42, brand.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasBrandRelationship(company.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasBrandRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
