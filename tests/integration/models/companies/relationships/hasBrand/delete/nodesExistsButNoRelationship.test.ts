import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Company} from "../../../../../../../src/models/companies/Company"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no relationship', async () => {
    const company = await seedNode('company')
    const brand = await seedNode('brand')

    await expect(Company.deleteHasBrandRelationship(company.id, brand.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
