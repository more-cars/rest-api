import {expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-company‹ relationship with nodes that do not exist', async () => {
    const brand = await seedBrand()
    const company = await seedCompany()

    await expect(Brand.createBelongsToCompanyRelationship(-42, company.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createBelongsToCompanyRelationship(brand.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createBelongsToCompanyRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
